function queryStringify(data: string):string {
    let newData = '?';
    for (const [key, value] of Object.entries(data)) {
      newData += `${key}=${value}&`;
    };
    newData = newData.slice(0, -1);
    return newData;
};

export default queryStringify;