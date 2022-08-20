const removeTenantField = (object) => {
    if(!object.tenant) console.log("Tenant Field does not exist here");
    let copyObject = object;
    delete copyObject.tenant;

    return copyObject;
}

module.exports.removeTenantField = removeTenantField;