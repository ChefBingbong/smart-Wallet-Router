export const parseContractError = (err: unknown): string => {
      return (
            err as {
                  reason: string;
            }
      ).reason;
};
