exports.handler = async function(event, context) {
    let date = new Date();
    if(date>= new Date("2021-02-25T09:00:00+07:00") && date < new Date("2021-02-26T00:00:00+07:00")){
        return {
            statusCode: 200,
            body: JSON.stringify({url:"https://docs.google.com/forms/d/17ycuM4MQqPYW4NyZoxCugWL0s_gOkTLmLKErT9oBLxc"})
        };
    }else{
        return {
            statusCode: 403
        };
    }
}