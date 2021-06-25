export const truncate = (str, limit) => (str.length > limit ? `${str.substr(0, limit - 1)}...` : str)
