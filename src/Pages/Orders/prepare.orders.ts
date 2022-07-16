export const prepareOrders = (data: any) => {

    let result: any = [];

    Object.entries(data).forEach(([name, data]: any[]) => {
        result.push({
            orderNum: name,
            ...data
        });

    });

    return result;

};