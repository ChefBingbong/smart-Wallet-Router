export const parseContractError = (err: any): string => {
     return (
          err as {
               reason: string;
          }
     ).reason;
};
