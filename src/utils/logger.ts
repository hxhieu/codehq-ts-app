// Abstract logger, just using console but may be replaced with something nicer :)

/* eslint-disable @typescript-eslint/no-explicit-any */

export const error = async (err: any) => console.error(err)
export const info = async (info: any) => console.log(info)
