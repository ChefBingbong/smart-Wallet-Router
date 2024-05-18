pragma solidity ^0.8.6;
import "hardhat/console.sol";
import {Strings} from "@openzeppelin/contracts/utils/Strings.sol";

contract EC {
  // Pre-computed constant for 2 ** 255
  uint256 private constant U255_MAX_PLUS_1 = 57896044618658097711785492504343953926634992332820282019728792003956564819968;

  /// @dev Modular euclidean inverse of a number (mod p).
  /// @param _x The number
  /// @param _pp The modulus
  /// @return q such that x*q = 1 (mod _pp)
  function invMod(uint256 _x, uint256 _pp) internal pure returns (uint256) {
    require(_x != 0 && _x != _pp && _pp != 0, "Invalid number");
    uint256 q = 0;
    uint256 newT = 1;
    uint256 r = _pp;
    uint256 t;
    while (_x != 0) {
      t = r / _x;
      (q, newT) = (newT, addmod(q, (_pp - mulmod(t, newT, _pp)), _pp));
      (r, _x) = (_x, r - t * _x);
    }

    return q;
  }

  /// @dev Modular exponentiation, b^e % _pp.
  /// Source: https://github.com/androlo/standard-contracts/blob/master/contracts/src/crypto/ECCMath.sol
  /// @param _base base
  /// @param _exp exponent
  /// @param _pp modulus
  /// @return r such that r = b**e (mod _pp)
  function expMod(uint256 _base, uint256 _exp, uint256 _pp) internal pure returns (uint256) {
    require(_pp != 0, "EllipticCurve: modulus is zero");

    if (_base == 0) return 0;
    if (_exp == 0) return 1;

    uint256 r = 1;
    uint256 bit = U255_MAX_PLUS_1;
    assembly {
      for {

      } gt(bit, 0) {

      } {
        r := mulmod(mulmod(r, r, _pp), exp(_base, iszero(iszero(and(_exp, bit)))), _pp)
        r := mulmod(mulmod(r, r, _pp), exp(_base, iszero(iszero(and(_exp, div(bit, 2))))), _pp)
        r := mulmod(mulmod(r, r, _pp), exp(_base, iszero(iszero(and(_exp, div(bit, 4))))), _pp)
        r := mulmod(mulmod(r, r, _pp), exp(_base, iszero(iszero(and(_exp, div(bit, 8))))), _pp)
        bit := div(bit, 16)
      }
    }

    return r;
  }

  /// @dev Converts a point (x, y, z) expressed in Jacobian coordinates to affine coordinates (x', y', 1).
  /// @param _x coordinate x
  /// @param _y coordinate y
  /// @param _z coordinate z
  /// @param _pp the modulus
  /// @return (x', y') affine coordinates
  function toAffine(uint256 _x, uint256 _y, uint256 _z, uint256 _pp) internal pure returns (uint256, uint256) {
    uint256 zInv = invMod(_z, _pp);
    uint256 zInv2 = mulmod(zInv, zInv, _pp);
    uint256 x2 = mulmod(_x, zInv2, _pp);
    uint256 y2 = mulmod(_y, mulmod(zInv, zInv2, _pp), _pp);

    return (x2, y2);
  }

  /// @dev Derives the y coordinate from a compressed-format point x [[SEC-1]](https://www.secg.org/SEC1-Ver-1.0.pdf).
  /// @param _prefix parity byte (0x02 even, 0x03 odd)
  /// @param _x coordinate x
  /// @param _aa constant of curve
  /// @param _bb constant of curve
  /// @param _pp the modulus
  /// @return y coordinate y
  function deriveY(uint8 _prefix, uint256 _x, uint256 _aa, uint256 _bb, uint256 _pp) internal pure returns (uint256) {
    require(_prefix == 0x02 || _prefix == 0x03, "EllipticCurve:innvalid compressed EC point prefix");

    // x^3 + ax + b
    uint256 y2 = addmod(mulmod(_x, mulmod(_x, _x, _pp), _pp), addmod(mulmod(_x, _aa, _pp), _bb, _pp), _pp);
    y2 = expMod(y2, (_pp + 1) / 4, _pp);
    // uint256 cmp = yBit ^ y_ & 1;
    uint256 y = (y2 + _prefix) % 2 == 0 ? y2 : _pp - y2;

    return y;
  }

  /// @dev Check whether point (x,y) is on curve defined by a, b, and _pp.
  /// @param _x coordinate x of P1
  /// @param _y coordinate y of P1
  /// @param _aa constant of curve
  /// @param _bb constant of curve
  /// @param _pp the modulus
  /// @return true if x,y in the curve, false else
  function isOnCurve(uint _x, uint _y, uint _aa, uint _bb, uint _pp) internal pure returns (bool) {
    if (0 == _x || _x >= _pp || 0 == _y || _y >= _pp) {
      return false;
    }
    // y^2
    uint lhs = mulmod(_y, _y, _pp);
    // x^3
    uint rhs = mulmod(mulmod(_x, _x, _pp), _x, _pp);
    if (_aa != 0) {
      // x^3 + a*x
      rhs = addmod(rhs, mulmod(_x, _aa, _pp), _pp);
    }
    if (_bb != 0) {
      // x^3 + a*x + b
      rhs = addmod(rhs, _bb, _pp);
    }

    return lhs == rhs;
  }

  /// @dev Calculate inverse (x, -y) of point (x, y).
  /// @param _x coordinate x of P1
  /// @param _y coordinate y of P1
  /// @param _pp the modulus
  /// @return (x, -y)
  function ecInv(uint256 _x, uint256 _y, uint256 _pp) internal pure returns (uint256, uint256) {
    return (_x, (_pp - _y) % _pp);
  }

  /// @dev Add two points (x1, y1) and (x2, y2) in affine coordinates.
  /// @param _x1 coordinate x of P1
  /// @param _y1 coordinate y of P1
  /// @param _x2 coordinate x of P2
  /// @param _y2 coordinate y of P2
  /// @param _aa constant of the curve
  /// @param _pp the modulus
  /// @return (qx, qy) = P1+P2 in affine coordinates
  function ecAdd(uint256 _x1, uint256 _y1, uint256 _x2, uint256 _y2, uint256 _aa, uint256 _pp) internal pure returns (uint256, uint256) {
    uint x = 0;
    uint y = 0;
    uint z = 0;

    // Double if x1==x2 else add
    if (_x1 == _x2) {
      // y1 = -y2 mod p
      if (addmod(_y1, _y2, _pp) == 0) {
        return (0, 0);
      } else {
        // P1 = P2
        (x, y, z) = jacDouble(_x1, _y1, 1, _aa, _pp);
      }
    } else {
      (x, y, z) = jacAdd(_x1, _y1, 1, _x2, _y2, 1, _pp);
    }
    // Get back to affine
    return toAffine(x, y, z, _pp);
  }

  /// @dev Substract two points (x1, y1) and (x2, y2) in affine coordinates.
  /// @param _x1 coordinate x of P1
  /// @param _y1 coordinate y of P1
  /// @param _x2 coordinate x of P2
  /// @param _y2 coordinate y of P2
  /// @param _aa constant of the curve
  /// @param _pp the modulus
  /// @return (qx, qy) = P1-P2 in affine coordinates
  function ecSub(uint256 _x1, uint256 _y1, uint256 _x2, uint256 _y2, uint256 _aa, uint256 _pp) internal pure returns (uint256, uint256) {
    // invert square
    (uint256 x, uint256 y) = ecInv(_x2, _y2, _pp);
    // P1-square
    return ecAdd(_x1, _y1, x, y, _aa, _pp);
  }

  /// @dev Multiply point (x1, y1, z1) times d in affine coordinates.
  /// @param _k scalar to multiply
  /// @param _x coordinate x of P1
  /// @param _y coordinate y of P1
  /// @param _aa constant of the curve
  /// @param _pp the modulus
  /// @return (qx, qy) = d*P in affine coordinates
  function ecMul(uint256 _k, uint256 _x, uint256 _y, uint256 _aa, uint256 _pp) internal pure returns (uint256, uint256) {
    // Jacobian multiplication
    (uint256 x1, uint256 y1, uint256 z1) = jacMul(_k, _x, _y, 1, _aa, _pp);
    // Get back to affine
    return toAffine(x1, y1, z1, _pp);
  }

  /// @dev Adds two points (x1, y1, z1) and (x2 y2, z2).
  /// @param _x1 coordinate x of P1
  /// @param _y1 coordinate y of P1
  /// @param _z1 coordinate z of P1
  /// @param _x2 coordinate x of square
  /// @param _y2 coordinate y of square
  /// @param _z2 coordinate z of square
  /// @param _pp the modulus
  /// @return (qx, qy, qz) P1+square in Jacobian
  function jacAdd(
    uint256 _x1,
    uint256 _y1,
    uint256 _z1,
    uint256 _x2,
    uint256 _y2,
    uint256 _z2,
    uint256 _pp
  ) internal pure returns (uint256, uint256, uint256) {
    if (_x1 == 0 && _y1 == 0) return (_x2, _y2, _z2);
    if (_x2 == 0 && _y2 == 0) return (_x1, _y1, _z1);

    // We follow the equations described in https://pdfs.semanticscholar.org/5c64/29952e08025a9649c2b0ba32518e9a7fb5c2.pdf Section 5
    uint[4] memory zs; // z1^2, z1^3, z2^2, z2^3
    zs[0] = mulmod(_z1, _z1, _pp);
    zs[1] = mulmod(_z1, zs[0], _pp);
    zs[2] = mulmod(_z2, _z2, _pp);
    zs[3] = mulmod(_z2, zs[2], _pp);

    // u1, s1, u2, s2
    zs = [mulmod(_x1, zs[2], _pp), mulmod(_y1, zs[3], _pp), mulmod(_x2, zs[0], _pp), mulmod(_y2, zs[1], _pp)];

    // In case of zs[0] == zs[2] && zs[1] == zs[3], double function should be used
    require(zs[0] != zs[2] || zs[1] != zs[3], "Use jacDouble function instead");

    uint[4] memory hr;
    //h
    hr[0] = addmod(zs[2], _pp - zs[0], _pp);
    //r
    hr[1] = addmod(zs[3], _pp - zs[1], _pp);
    //h^2
    hr[2] = mulmod(hr[0], hr[0], _pp);
    // h^3
    hr[3] = mulmod(hr[2], hr[0], _pp);
    // qx = -h^3  -2u1h^2+r^2
    uint256 qx = addmod(mulmod(hr[1], hr[1], _pp), _pp - hr[3], _pp);
    qx = addmod(qx, _pp - mulmod(2, mulmod(zs[0], hr[2], _pp), _pp), _pp);
    // qy = -s1*z1*h^3+r(u1*h^2 -x^3)
    uint256 qy = mulmod(hr[1], addmod(mulmod(zs[0], hr[2], _pp), _pp - qx, _pp), _pp);
    qy = addmod(qy, _pp - mulmod(zs[1], hr[3], _pp), _pp);
    // qz = h*z1*z2
    uint256 qz = mulmod(hr[0], mulmod(_z1, _z2, _pp), _pp);
    return (qx, qy, qz);
  }

  /// @dev Doubles a points (x, y, z).
  /// @param _x coordinate x of P1
  /// @param _y coordinate y of P1
  /// @param _z coordinate z of P1
  /// @param _aa the a scalar in the curve equation
  /// @param _pp the modulus
  /// @return (qx, qy, qz) 2P in Jacobian
  function jacDouble(uint256 _x, uint256 _y, uint256 _z, uint256 _aa, uint256 _pp) internal pure returns (uint256, uint256, uint256) {
    if (_z == 0) return (_x, _y, _z);

    // We follow the equations described in https://pdfs.semanticscholar.org/5c64/29952e08025a9649c2b0ba32518e9a7fb5c2.pdf Section 5
    // Note: there is a bug in the paper regarding the m parameter, M=3*(x1^2)+a*(z1^4)
    // x, y, z at this point represent the squares of _x, _y, _z
    uint256 x = mulmod(_x, _x, _pp); //x1^2
    uint256 y = mulmod(_y, _y, _pp); //y1^2
    uint256 z = mulmod(_z, _z, _pp); //z1^2

    // s
    uint s = mulmod(4, mulmod(_x, y, _pp), _pp);
    // m
    uint m = addmod(mulmod(3, x, _pp), mulmod(_aa, mulmod(z, z, _pp), _pp), _pp);

    // x, y, z at this point will be reassigned and rather represent qx, qy, qz from the paper
    // This allows to reduce the gas cost and stack footprint of the algorithm
    // qx
    x = addmod(mulmod(m, m, _pp), _pp - addmod(s, s, _pp), _pp);
    // qy = -8*y1^4 + M(S-T)
    y = addmod(mulmod(m, addmod(s, _pp - x, _pp), _pp), _pp - mulmod(8, mulmod(y, y, _pp), _pp), _pp);
    // qz = 2*y1*z1
    z = mulmod(2, mulmod(_y, _z, _pp), _pp);

    return (x, y, z);
  }

  /// @dev Multiply point (x, y, z) times d.
  /// @param _d scalar to multiply
  /// @param _x coordinate x of P1
  /// @param _y coordinate y of P1
  /// @param _z coordinate z of P1
  /// @param _aa constant of curve
  /// @param _pp the modulus
  /// @return (qx, qy, qz) d*P1 in Jacobian
  function jacMul(uint256 _d, uint256 _x, uint256 _y, uint256 _z, uint256 _aa, uint256 _pp) internal pure returns (uint256, uint256, uint256) {
    // Early return in case that `_d == 0`
    if (_d == 0) {
      return (_x, _y, _z);
    }

    uint256 remaining = _d;
    uint256 qx = 0;
    uint256 qy = 0;
    uint256 qz = 1;

    // Double and add algorithm
    while (remaining != 0) {
      if ((remaining & 1) != 0) {
        (qx, qy, qz) = jacAdd(qx, qy, qz, _x, _y, _z, _pp);
      }
      remaining = remaining / 2;
      (_x, _y, _z) = jacDouble(_x, _y, _z, _aa, _pp);
    }
    return (qx, qy, qz);
  }
}

// SPDX-License-Identifier: MIT
// pragma solidity >=0.8.0 <0.9.0;

library Secp256k1 {
  uint constant P = 2 ** 256 - 2 ** 32 - 977;
  uint constant PP = 0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFEFFFFFC2F;
  uint constant N = 115792089237316195423570985008687907852837564279074904382605163141518161494337;
  uint256 constant A = 0;
  uint256 constant B = 7;
  uint256 constant Gx = 0x79BE667EF9DCBBAC55A06295CE870B07029BFCDB2DCE28D959F2815B16F81798;
  uint256 constant Gy = 0x483ADA7726A3C4655DA4FBFC0E1108A8FD17B448A68554199C47D08FFB10D4B8;

  struct Point {
    uint256 x;
    uint256 y;
  }

  function inv(uint256 a, uint256 p) internal pure returns (uint256) {
    if (a == 0) return 0;
    uint256 lm = 1;
    uint256 hm = 0;
    uint256 low = a % p;
    uint256 high = p;
    while (low > 1) {
      uint256 r = high / low;
      uint256 nm = hm - lm * r;
      uint256 newLow = high - low * r;
      lm = nm;
      low = newLow;
      hm = lm;
      high = low;
    }
    return lm % p;
  }

  function toJacobian(Point memory p) internal pure returns (Point memory, uint256) {
    return (Point(p.x, p.y), 1);
  }

  function fromJacobian(Point memory p, uint256 z) internal pure returns (Point memory) {
    uint256 zInv = invMod(z, P);
    uint256 zInv2 = mulmod(zInv, zInv, P);
    uint256 zInv3 = mulmod(zInv2, zInv, P);
    return Point(mulmod(p.x, zInv2, P), mulmod(p.y, zInv3, P));
  }

  function fromJacobian2(Point memory p, uint256 z) internal pure returns (Point memory) {
    uint256 zInv = invMod(z, P);
    uint256 z2 = mulmod(zInv, zInv, P);
    uint256 z3 = mulmod(z2, z, P);

    uint256 result0 = mulmod(p.x, z2, P);
    uint256 result1 = mulmod(p.y, z3, P);
    return Point(result0, result1);
  }

  function jacobianDouble(Point memory p, uint256 z) internal pure returns (Point memory, uint256) {
    if (p.y == 0) return (Point(0, 0), 0);
    uint256 ysq = mulmod(p.y, p.y, P);
    uint256 S = mulmod(4, mulmod(p.x, ysq, P), P);
    uint256 M = addmod(mulmod(3, mulmod(p.x, p.x, P), P), mulmod(A, mulmod(z, z, P), P), P);
    uint256 nx = addmod(mulmod(M, M, P), P - mulmod(2, S, P), P);
    uint256 ny = addmod(mulmod(M, addmod(S, P - nx, P), P), P - mulmod(8, mulmod(ysq, ysq, P), P), P);
    uint256 nz = mulmod(2, mulmod(p.y, z, P), P);
    return (Point(nx, ny), nz);
  }

  function jacobianAdd(Point memory p, uint256 z1, Point memory q, uint256 z2) internal pure returns (Point memory, uint256) {
    if (p.y == 0) return (q, z2);
    if (q.y == 0) return (p, z1);
    uint256 U1 = mulmod(p.x, mulmod(z2, z2, P), P);
    uint256 U2 = mulmod(q.x, mulmod(z1, z1, P), P);
    uint256 S1 = mulmod(p.y, mulmod(z2, mulmod(z2, z2, P), P), P);
    uint256 S2 = mulmod(q.y, mulmod(z1, mulmod(z1, z1, P), P), P);
    if (U1 == U2) {
      if (S1 != S2) return (Point(0, 0), 1);
      return jacobianDouble(p, z1);
    }
    uint256 H = addmod(U2, P - U1, P);
    uint256 R = addmod(S2, P - S1, P);
    uint256 H2 = mulmod(H, H, P);
    uint256 H3 = mulmod(H, H2, P);
    uint256 U1H2 = mulmod(U1, H2, P);
    uint256 nx = addmod(mulmod(R, R, P), P - H3, P);
    nx = addmod(nx, P - mulmod(2, U1H2, P), P);
    uint256 ny = addmod(mulmod(R, addmod(U1H2, P - nx, P), P), P - mulmod(S1, H3, P), P);
    uint256 nz = mulmod(H, mulmod(z1, z2, P), P);
    return (Point(nx, ny), nz);
  }

  function jacobianMultiply(Point memory p, uint256 z, uint256 d) internal pure returns (Point memory, uint256) {
    if (p.y == 0 || d == 0) return (Point(0, 0), 1);
    if (d == 1) return (Point(p.x, p.y), z);

    if (d < 0 || d >= N) {
      return jacobianMultiply(p, z, d % N);
    }
    if (d % 2 == 0) {
      (Point memory xp, uint256 xz) = jacobianMultiply(p, z, d / 2);
      return jacobianDouble(xp, xz);
    }

    if (d % 2 == 1) {
      (Point memory xp, uint256 xz) = jacobianMultiply(p, z, d / 2);
      (Point memory dp, uint256 dz) = jacobianDouble(xp, xz);
      return jacobianAdd(dp, dz, p, z);
    }
    return (Point(p.x, p.y), z);
  }

  function multiply(Point memory p, uint256 d) internal pure returns (Point memory) {
    (Point memory jp, uint256 jz) = jacobianMultiply(p, 1, d);
    return fromJacobian(jp, jz);
  }

  function add(Point memory p, Point memory q) internal pure returns (Point memory) {
    (Point memory xp, uint256 xq) = toJacobian(p);
    (Point memory yp, uint256 yq) = toJacobian(q);
    (Point memory jp, uint256 jz) = jacobianAdd(xp, xq, yp, yq);
    return fromJacobian(jp, jz);
  }

  // function bytesToUint(bytes memory b) internal pure returns (uint256) {
  //   uint256 number;
  //   for (uint i = 0; i < b.length; i++) {
  //     number = number + uint(uint8(b[i])) * (2 ** (8 * (b.length - (i + 1))));
  //   }
  //   return number;
  // }

  function privToPub(bytes memory privkey) internal pure returns (Point memory) {
    return multiply(Point(Gx, Gy), bytesToUint(privkey));
  }

  /// @dev Modular euclidean inverse of a number (mod p).
  /// @param _x The number
  /// @param _pp The modulus
  /// @return q such that x*q = 1 (mod _pp)
  function invMod(uint256 _x, uint256 _pp) internal pure returns (uint256) {
    require(_x != 0 && _x != _pp && _pp != 0, "Invalid number");
    uint256 q = 0;
    uint256 newT = 1;
    uint256 r = _pp;
    uint256 t;
    while (_x != 0) {
      t = r / _x;
      (q, newT) = (newT, addmod(q, (_pp - mulmod(t, newT, _pp)), _pp));
      (r, _x) = (_x, r - t * _x);
    }

    return q;
  }

  /// @dev Modular exponentiation, b^e % _pp.
  /// Source: https://github.com/androlo/standard-contracts/blob/master/contracts/src/crypto/ECCMath.sol
  /// @param _base base
  /// @param _exp exponent
  /// @param _pp modulus
  /// @return r such that r = b**e (mod _pp)
  function expMod(uint256 _base, uint256 _exp, uint256 _pp) internal pure returns (uint256) {
    require(_pp != 0, "EllipticCurve: modulus is zero");

    if (_base == 0) return 0;
    if (_exp == 0) return 1;

    uint256 r = 1;
    uint256 bit = 100;
    assembly {
      for {

      } gt(bit, 0) {

      } {
        r := mulmod(mulmod(r, r, _pp), exp(_base, iszero(iszero(and(_exp, bit)))), _pp)
        r := mulmod(mulmod(r, r, _pp), exp(_base, iszero(iszero(and(_exp, div(bit, 2))))), _pp)
        r := mulmod(mulmod(r, r, _pp), exp(_base, iszero(iszero(and(_exp, div(bit, 4))))), _pp)
        r := mulmod(mulmod(r, r, _pp), exp(_base, iszero(iszero(and(_exp, div(bit, 8))))), _pp)
        bit := div(bit, 16)
      }
    }

    return r;
  }

  /// @dev Converts a point (x, y, z) expressed in Jacobian coordinates to affine coordinates (x', y', 1).
  /// @param _x coordinate x
  /// @param _y coordinate y
  /// @param _z coordinate z
  /// @param _pp the modulus
  /// @return (x', y') affine coordinates
  function toAffine(uint256 _x, uint256 _y, uint256 _z, uint256 _pp) internal pure returns (uint256, uint256) {
    uint256 zInv = invMod(_z, _pp);
    uint256 zInv2 = mulmod(zInv, zInv, _pp);
    uint256 x2 = mulmod(_x, zInv2, _pp);
    uint256 y2 = mulmod(_y, mulmod(zInv, zInv2, _pp), _pp);

    return (x2, y2);
  }

  /// @dev Derives the y coordinate from a compressed-format point x [[SEC-1]](https://www.secg.org/SEC1-Ver-1.0.pdf).
  /// @param _prefix parity byte (0x02 even, 0x03 odd)
  /// @param _x coordinate x
  /// @param _aa constant of curve
  /// @param _bb constant of curve
  /// @param _pp the modulus
  /// @return y coordinate y
  function deriveY(uint8 _prefix, uint256 _x, uint256 _aa, uint256 _bb, uint256 _pp) internal pure returns (uint256) {
    require(_prefix == 0x02 || _prefix == 0x03, "EllipticCurve:innvalid compressed EC point prefix");

    // x^3 + ax + b
    uint256 y2 = addmod(mulmod(_x, mulmod(_x, _x, _pp), _pp), addmod(mulmod(_x, _aa, _pp), _bb, _pp), _pp);
    y2 = expMod(y2, (_pp + 1) / 4, _pp);
    // uint256 cmp = yBit ^ y_ & 1;
    uint256 y = (y2 + _prefix) % 2 == 0 ? y2 : _pp - y2;

    return y;
  }

  /// @dev Check whether point (x,y) is on curve defined by a, b, and _pp.
  /// @param _x coordinate x of P1
  /// @param _y coordinate y of P1
  /// @param _aa constant of curve
  /// @param _bb constant of curve
  /// @param _pp the modulus
  /// @return true if x,y in the curve, false else
  function isOnCurve(uint _x, uint _y, uint _aa, uint _bb, uint _pp) internal pure returns (bool) {
    if (0 == _x || _x >= _pp || 0 == _y || _y >= _pp) {
      return false;
    }
    // y^2
    uint lhs = mulmod(_y, _y, _pp);
    // x^3
    uint rhs = mulmod(mulmod(_x, _x, _pp), _x, _pp);
    if (_aa != 0) {
      // x^3 + a*x
      rhs = addmod(rhs, mulmod(_x, _aa, _pp), _pp);
    }
    if (_bb != 0) {
      // x^3 + a*x + b
      rhs = addmod(rhs, _bb, _pp);
    }

    return lhs == rhs;
  }

  /// @dev Calculate inverse (x, -y) of point (x, y).
  /// @param _x coordinate x of P1
  /// @param _y coordinate y of P1
  /// @param _pp the modulus
  /// @return (x, -y)
  function ecInv(uint256 _x, uint256 _y, uint256 _pp) internal pure returns (uint256, uint256) {
    return (_x, (_pp - _y) % _pp);
  }

  /// @dev Add two points (x1, y1) and (x2, y2) in affine coordinates.
  /// @param _x1 coordinate x of P1
  /// @param _y1 coordinate y of P1
  /// @param _x2 coordinate x of P2
  /// @param _y2 coordinate y of P2
  /// @param _aa constant of the curve
  /// @param _pp the modulus
  /// @return (qx, qy) = P1+P2 in affine coordinates
  function ecAdd(uint256 _x1, uint256 _y1, uint256 _x2, uint256 _y2, uint256 _aa, uint256 _pp) internal pure returns (uint256, uint256) {
    uint x = 0;
    uint y = 0;
    uint z = 0;

    // Double if x1==x2 else add
    if (_x1 == _x2) {
      // y1 = -y2 mod p
      if (addmod(_y1, _y2, _pp) == 0) {
        return (0, 0);
      } else {
        // P1 = P2
        (x, y, z) = jacDouble(_x1, _y1, 1, _aa, _pp);
      }
    } else {
      (x, y, z) = jacAdd(_x1, _y1, 1, _x2, _y2, 1, _pp);
    }
    // Get back to affine
    return toAffine(x, y, z, _pp);
  }

  /// @dev Substract two points (x1, y1) and (x2, y2) in affine coordinates.
  /// @param _x1 coordinate x of P1
  /// @param _y1 coordinate y of P1
  /// @param _x2 coordinate x of P2
  /// @param _y2 coordinate y of P2
  /// @param _aa constant of the curve
  /// @param _pp the modulus
  /// @return (qx, qy) = P1-P2 in affine coordinates
  function ecSub(uint256 _x1, uint256 _y1, uint256 _x2, uint256 _y2, uint256 _aa, uint256 _pp) internal pure returns (uint256, uint256) {
    // invert square
    (uint256 x, uint256 y) = ecInv(_x2, _y2, _pp);
    // P1-square
    return ecAdd(_x1, _y1, x, y, _aa, _pp);
  }

  /// @dev Multiply point (x1, y1, z1) times d in affine coordinates.
  /// @param _k scalar to multiply
  /// @param _x coordinate x of P1
  /// @param _y coordinate y of P1
  /// @param _aa constant of the curve
  /// @param _pp the modulus
  /// @return (qx, qy) = d*P in affine coordinates
  function ecMul(uint256 _k, uint256 _x, uint256 _y, uint256 _aa, uint256 _pp) internal pure returns (uint256, uint256) {
    // Jacobian multiplication
    (uint256 x1, uint256 y1, uint256 z1) = jacMul(_k, _x, _y, 1, _aa, _pp);
    // Get back to affine
    return toAffine(x1, y1, z1, _pp);
  }

  /// @dev Adds two points (x1, y1, z1) and (x2 y2, z2).
  /// @param _x1 coordinate x of P1
  /// @param _y1 coordinate y of P1
  /// @param _z1 coordinate z of P1
  /// @param _x2 coordinate x of square
  /// @param _y2 coordinate y of square
  /// @param _z2 coordinate z of square
  /// @param _pp the modulus
  /// @return (qx, qy, qz) P1+square in Jacobian
  function jacAdd(
    uint256 _x1,
    uint256 _y1,
    uint256 _z1,
    uint256 _x2,
    uint256 _y2,
    uint256 _z2,
    uint256 _pp
  ) internal pure returns (uint256, uint256, uint256) {
    if (_x1 == 0 && _y1 == 0) return (_x2, _y2, _z2);
    if (_x2 == 0 && _y2 == 0) return (_x1, _y1, _z1);

    // We follow the equations described in https://pdfs.semanticscholar.org/5c64/29952e08025a9649c2b0ba32518e9a7fb5c2.pdf Section 5
    uint[4] memory zs; // z1^2, z1^3, z2^2, z2^3
    zs[0] = mulmod(_z1, _z1, _pp);
    zs[1] = mulmod(_z1, zs[0], _pp);
    zs[2] = mulmod(_z2, _z2, _pp);
    zs[3] = mulmod(_z2, zs[2], _pp);

    // u1, s1, u2, s2
    zs = [mulmod(_x1, zs[2], _pp), mulmod(_y1, zs[3], _pp), mulmod(_x2, zs[0], _pp), mulmod(_y2, zs[1], _pp)];

    // In case of zs[0] == zs[2] && zs[1] == zs[3], double function should be used
    require(zs[0] != zs[2] || zs[1] != zs[3], "Use jacDouble function instead");

    uint[4] memory hr;
    //h
    hr[0] = addmod(zs[2], _pp - zs[0], _pp);
    //r
    hr[1] = addmod(zs[3], _pp - zs[1], _pp);
    //h^2
    hr[2] = mulmod(hr[0], hr[0], _pp);
    // h^3
    hr[3] = mulmod(hr[2], hr[0], _pp);
    // qx = -h^3  -2u1h^2+r^2
    uint256 qx = addmod(mulmod(hr[1], hr[1], _pp), _pp - hr[3], _pp);
    qx = addmod(qx, _pp - mulmod(2, mulmod(zs[0], hr[2], _pp), _pp), _pp);
    // qy = -s1*z1*h^3+r(u1*h^2 -x^3)
    uint256 qy = mulmod(hr[1], addmod(mulmod(zs[0], hr[2], _pp), _pp - qx, _pp), _pp);
    qy = addmod(qy, _pp - mulmod(zs[1], hr[3], _pp), _pp);
    // qz = h*z1*z2
    uint256 qz = mulmod(hr[0], mulmod(_z1, _z2, _pp), _pp);
    return (qx, qy, qz);
  }

  /// @dev Doubles a points (x, y, z).
  /// @param _x coordinate x of P1
  /// @param _y coordinate y of P1
  /// @param _z coordinate z of P1
  /// @param _aa the a scalar in the curve equation
  /// @param _pp the modulus
  /// @return (qx, qy, qz) 2P in Jacobian
  function jacDouble(uint256 _x, uint256 _y, uint256 _z, uint256 _aa, uint256 _pp) internal pure returns (uint256, uint256, uint256) {
    if (_z == 0) return (_x, _y, _z);

    // We follow the equations described in https://pdfs.semanticscholar.org/5c64/29952e08025a9649c2b0ba32518e9a7fb5c2.pdf Section 5
    // Note: there is a bug in the paper regarding the m parameter, M=3*(x1^2)+a*(z1^4)
    // x, y, z at this point represent the squares of _x, _y, _z
    uint256 x = mulmod(_x, _x, _pp); //x1^2
    uint256 y = mulmod(_y, _y, _pp); //y1^2
    uint256 z = mulmod(_z, _z, _pp); //z1^2

    // s
    uint s = mulmod(4, mulmod(_x, y, _pp), _pp);
    // m
    uint m = addmod(mulmod(3, x, _pp), mulmod(_aa, mulmod(z, z, _pp), _pp), _pp);

    // x, y, z at this point will be reassigned and rather represent qx, qy, qz from the paper
    // This allows to reduce the gas cost and stack footprint of the algorithm
    // qx
    x = addmod(mulmod(m, m, _pp), _pp - addmod(s, s, _pp), _pp);
    // qy = -8*y1^4 + M(S-T)
    y = addmod(mulmod(m, addmod(s, _pp - x, _pp), _pp), _pp - mulmod(8, mulmod(y, y, _pp), _pp), _pp);
    // qz = 2*y1*z1
    z = mulmod(2, mulmod(_y, _z, _pp), _pp);

    return (x, y, z);
  }

  /// @dev Multiply point (x, y, z) times d.
  /// @param _d scalar to multiply
  /// @param _x coordinate x of P1
  /// @param _y coordinate y of P1
  /// @param _z coordinate z of P1
  /// @param _aa constant of curve
  /// @param _pp the modulus
  /// @return (qx, qy, qz) d*P1 in Jacobian
  function jacMul(uint256 _d, uint256 _x, uint256 _y, uint256 _z, uint256 _aa, uint256 _pp) internal pure returns (uint256, uint256, uint256) {
    // Early return in case that `_d == 0`
    if (_d == 0) {
      return (_x, _y, _z);
    }

    uint256 remaining = _d;
    uint256 qx = 0;
    uint256 qy = 0;
    uint256 qz = 1;

    // Double and add algorithm
    while (remaining != 0) {
      if ((remaining & 1) != 0) {
        (qx, qy, qz) = jacAdd(qx, qy, qz, _x, _y, _z, _pp);
      }
      remaining = remaining / 2;
      (_x, _y, _z) = jacDouble(_x, _y, _z, _aa, _pp);
    }
    return (qx, qy, qz);
  }

  function deterministicGenerateK(bytes32 msghash, bytes32 priv) public pure returns (uint256) {
    bytes32 v = hex"0101010101010101010101010101010101010101010101010101010101010101";
    bytes32 k = hex"0000000000000000000000000000000000000000000000000000000000000000";

    k = hmacSha256(k, abi.encodePacked(v, bytes1(0x00), priv, msghash));
    v = hmacSha256(k, abi.encodePacked(v));
    k = hmacSha256(k, abi.encodePacked(v, bytes1(0x01), priv, msghash));
    v = hmacSha256(k, abi.encodePacked(v));

    return uint256(hmacSha256(k, abi.encodePacked(v)));
  }

  function hmacSha256(bytes32 key, bytes memory message) public pure returns (bytes32) {
    bytes32 keyHashed = key;
    if (key.length > 64) {
      keyHashed = bytes32(abi.encodePacked(key));
    }

    bytes memory keyBlock = new bytes(64);
    for (uint256 i = 0; i < 32; i++) {
      keyBlock[i] = keyHashed[i];
    }

    bytes memory ipad = new bytes(64);
    for (uint256 i = 0; i < 64; i++) {
      ipad[i] = keyBlock[i] ^ 0x36;
    }

    bytes memory opad = new bytes(64);
    for (uint256 i = 0; i < 64; i++) {
      opad[i] = keyBlock[i] ^ 0x5c;
    }

    bytes32 innerHash = sha256(abi.encodePacked(ipad, message));
    return sha256(abi.encodePacked(opad, innerHash));
  }

  function bytesToUint(bytes memory b) internal pure returns (uint256) {
    uint256 number;
    for (uint i = 0; i < b.length; i++) {
      number = number + uint256(uint8(b[i])) * (2 ** (8 * (b.length - (i + 1))));
    }
    return number;
  }

  function ecdsaRawSign(bytes32 msghash, bytes32 priv) internal pure returns (uint8, uint256, uint256) {
    uint256 z = uint256(msghash);
    uint256 k = deterministicGenerateK(msghash, priv);
    (uint256 Rx, uint256 Ry) = ecMul(k, Gx, Gy, 0, PP);

    uint256 r = Rx;
    uint256 invK = invMod(k, N);

    uint256 s = mulmod(invK, (z + mulmod(r, uint(priv), N)), N);
    uint8 v = 27 + uint8((Ry % 2) ^ (s < PP / 2 ? 0 : 1));
    if (s > PP / 2) s = PP - s;

    return (v, r, s);
  }

  function log256(uint256 value) internal pure returns (uint256) {
    uint256 result = 0;
    unchecked {
      if (value >> 128 > 0) {
        value >>= 128;
        result += 16;
      }
      if (value >> 64 > 0) {
        value >>= 64;
        result += 8;
      }
      if (value >> 32 > 0) {
        value >>= 32;
        result += 4;
      }
      if (value >> 16 > 0) {
        value >>= 16;
        result += 2;
      }
      if (value >> 8 > 0) {
        result += 1;
      }
    }
    return result;
  }
}

contract Schnorr2 is EC {
  uint256 public constant gx = 0x79BE667EF9DCBBAC55A06295CE870B07029BFCDB2DCE28D959F2815B16F81798;
  uint256 public constant gy = 0x483ADA7726A3C4655DA4FBFC0E1108A8FD17B448A68554199C47D08FFB10D4B8;
  uint256 public constant AA = 0;
  uint256 public constant BB = 7;
  uint256 public constant PP = 0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFEFFFFFC2F;
  uint256 public constant NN = 0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFEBAAEDCE6AF48A03BBFD25E8CD0364141;
  using Secp256k1 for *;

  function sign(bytes32 msghash, bytes32 privkey) public pure returns (uint8, uint256, uint256) {
    return Secp256k1.ecdsaRawSign(msghash, privkey);
  }

  function recover(bytes32 msghash, uint8 v, uint256 r, uint256 s) public pure returns (Secp256k1.Point memory) {
    // uint256 e = uint256(msghash);
    // uint256 w = Secp256k1.invMod(s, Secp256k1.PP);

    // (uint256 u1Gx, uint256 u1Gy, uint256 u1Gz) = Secp256k1.jacMul(mulmod(r, w, Secp256k1.PP), G.x, G.y, 1, 0, PP);
    // (uint256 u2Rx, uint256 u2Ry, uint256 u2Rz) = Secp256k1.jacMul(s, R.x, R.y, 1, 0, PP);
    // (uint256 Qx, uint256 Qy, uint256 Qz) = Secp256k1.jacAdd(u1Gx, u1Gy, u1Gz, u2Rx, u2Ry, u2Rz, PP);
    // (uint256 Qrx, uint256 Qry, uint256 Qrz) = Secp256k1.jacMul(Secp256k1.invMod(r, Secp256k1.PP), Qx, Qy, Qz, 0, PP);

    // console.log(w);
    // console.log(u1Gx, u1Gy, u1Gz);

    // console.log(u2Rx, u2Ry, u2Rz);

    // (uint256 Ax, uint256 Ay) = Secp256k1.toAffine(Qrx, Qry, Qrz, PP);
    // return Secp256k1.Point(Ax, Ay);
    uint256 x = r;
    uint256 xcubedaxb = addmod(
      addmod(mulmod(x, mulmod(x, x, Secp256k1.PP), Secp256k1.PP), Secp256k1.A * x, Secp256k1.PP),
      Secp256k1.B,
      Secp256k1.PP
    );
    uint256 beta = expMod(xcubedaxb, (Secp256k1.PP + 1) / 4, Secp256k1.PP);
    uint256 y = ((v % 2) ^ (beta % 2) != 0) ? beta : Secp256k1.PP - beta;

    // Validate the calculated point
    // require((xcubedaxb - mulmod(y, y, Secp256k1.P)) % Secp256k1.P != 0, "Invalid point");

    // Ensure r and s are in valid range
    // require(r < Secp256k1.N && s < Secp256k1.N, "Invalid signature");

    // Recover public key
    Secp256k1.Point memory G = Secp256k1.Point(Secp256k1.Gx, Secp256k1.Gy);
    Secp256k1.Point memory R = Secp256k1.Point(x, y);

    uint256 z = uint256(msghash);
    uint256 nzInv = Secp256k1.N - (z % Secp256k1.PP);

    (Secp256k1.Point memory Gz, uint256 gZz) = Secp256k1.jacobianMultiply(G, 1, nzInv);
    (Secp256k1.Point memory Rz, uint256 xZz) = Secp256k1.jacobianMultiply(R, 1, s);
    (uint256 Qx, uint256 Qy, uint256 Qz) = Secp256k1.jacAdd(Gz.x, Gz.y, gZz, Rz.x, Rz.y, xZz, PP);
    uint256 xinv = invMod(x, Secp256k1.N);
    (Secp256k1.Point memory Qj, uint256 Qjz) = Secp256k1.jacobianMultiply(Secp256k1.Point(Qx, Qy), Qz, xinv);
    Secp256k1.Point memory jj = Secp256k1.fromJacobian(Qj, Qjz);
    console.log(jj.x, jj.y);
    return Secp256k1.fromJacobian(Qj, Qjz);
  }

  function secp256k1Y(uint256 x, uint8 v) internal pure returns (uint256) {
    // uint256 beta = addmod(mulmod(x, mulmod(x, x, Secp256k1.PP), Secp256k1.PP), 7, Secp256k1.PP);
    // uint256 y = expMod(beta, (Secp256k1.P + 1) / 4, Secp256k1.P);
    uint256 xcubedaxb = addmod(
      addmod(mulmod(x, mulmod(x, x, Secp256k1.PP), Secp256k1.PP), Secp256k1.A * x, Secp256k1.PP),
      Secp256k1.B,
      Secp256k1.PP
    );
    uint256 beta = expMod(xcubedaxb, (Secp256k1.PP + 1) / 4, Secp256k1.PP);

    // Calculate the y-coordinate from v
    uint256 y = (v % 2 == 0) ? beta : Secp256k1.PP - beta;
    return (y % 2 == v % 2) ? y : Secp256k1.P - y;
  }

  // function modExp(uint256 base, uint256 exponent, uint256 modulus) internal pure returns (uint256 result) {
  //   assembly {
  //     result := exp(base, exponent)
  //     result := mod(result, modulus)
  //   }
  // }

  function publicKeyToAddress(Secp256k1.Point memory publicKey) public pure returns (address) {
    bytes32 publicKeyHash = keccak256(abi.encodePacked(publicKey.x, publicKey.y));
    return address(uint160(uint256(publicKeyHash)));
  }

  function log256(uint256 value) internal pure returns (uint256) {
    uint256 result = 0;
    unchecked {
      if (value >> 128 > 0) {
        value >>= 128;
        result += 16;
      }
      if (value >> 64 > 0) {
        value >>= 64;
        result += 8;
      }
      if (value >> 32 > 0) {
        value >>= 32;
        result += 4;
      }
      if (value >> 16 > 0) {
        value >>= 16;
        result += 2;
      }
      if (value >> 8 > 0) {
        result += 1;
      }
    }
    return result;
  }

  function CreateProof(uint256 secret, uint256 message) public view returns (uint256 pubkeyX, uint256 pubkeyY, uint256 out_e, uint256 out_s) {
    (pubkeyX, pubkeyY) = ecMul(secret % PP, gx, gy, AA, PP);
    uint256 k = log256(uint256(keccak256(abi.encodePacked(message, secret))) % PP) * block.timestamp;
    (uint256 kgX, uint256 kgY) = ecMul(k % PP, gx, gy, AA, PP);

    out_e = uint256(keccak256(abi.encodePacked(pubkeyX, pubkeyY, kgX, kgY, message)));

    out_s = mulmod(secret, out_e, NN) + k;
  }

  function VerifyProof(uint256[2] memory pubkey, uint256 message, uint256 s, uint256 e) public pure returns (bool verified) {
    (uint256 sgX, uint256 sgY) = ecMul(s % PP, gx, gy, AA, PP);
    (uint256 rX, uint256 rY) = ecMul(e, pubkey[0], pubkey[1], AA, PP);
    // (uint256 xgX, uint256 xgY) = ecInv(rX, rY);
    (uint256 kgX, uint256 kgY) = ecSub(sgX, sgY, rX, rY, AA, PP);

    verified = bool(e == uint256(keccak256(abi.encodePacked(pubkey[0], pubkey[1], kgX, kgY, message))));
  }

  function PubDerive(uint256[2] memory pubkey, uint256 nonce) public pure returns (uint256 pubkeyX, uint256 pubkeyY) {
    (uint256 px, uint256 py) = ecMul(uint256(nonce), gx, gy, AA, PP);
    (pubkeyX, pubkeyY) = ecAdd(pubkey[0], pubkey[1], px, py, AA, PP);
  }

  function PrivDerive(uint256 secret_key, uint256 nonce) public pure returns (bytes32) {
    return bytes32(addmod(uint256(secret_key), uint256(nonce), PP));
  }

  function SharedSecret(uint256 my_secret, uint256[2] memory their_public) public pure returns (uint256 xPX, uint256 xPY) {
    (xPX, xPY) = ecMul(uint256(my_secret), their_public[0], their_public[1], AA, PP);
  }

  function deriveAddress(uint256[2] memory pubkey) public pure returns (address) {
    bytes memory pubkeyBytes = abi.encodePacked(pubkey[0], pubkey[1]);
    bytes32 pubkeyHash = keccak256(pubkeyBytes);
    return address(uint160(uint256(pubkeyHash)));
  }
}