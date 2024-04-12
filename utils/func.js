
export const dataFilledFromModel = (model, data) => {

    let fields = {};
    // Data object
    for (const [key, value] of Object.entries(model.schema.paths)) {  

        if(key != '__v'){
            fields[key] = {"type": value.instance, "value":data._doc[key]}
        }
    } 
    
    return fields;
    
};

export const dataEmptyFromModel = model => {
    let fields = {};
    let val = undefined;
    
    for (const [key, value] of Object.entries(model.schema.paths)) {  
    
        if(!['_id', '__v'].includes(key)){
            switch (value.instance) {
                case "String":
                    val='';
                    break;
                case "Number":
                    val=0;
                default:
                    break;
            }
            fields[key] = {"type": value.instance, "value":val}
        }
    };

    return fields;
}