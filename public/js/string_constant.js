var CONFIG = (function() {
     var private = {

         'SITE_NAME': '/heyzu/',

         'ERROR_MESSAGE': 'An error has occurred .Please try again later.',
         'SUCCESS_MESSAGE': 'Record is successfully deleted.',
         'SUCCESS_UPDATED_MESSAGE': 'Record is successfully updated.',
         'SUCCESS_ADDED_MESSAGE': 'Record is successfully created.',
         
         'DATE_ERROR_MESSAGE': 'Date is required',
         'EDIT':'Edit',
         'DELETE':'Delete',
         'UPDATE':'Update',
         'SAVE':'Save',
         'TRUE':'True',
         'FALSE':'False',
         'CLOSE':'Close',
         'CHECKLIST':'Checklist',

         'DETAIL':'Detail',
         'DEPARTMENT':'Departments',
         'ADD_NEW_ITEM':'Add New Item',
         'SAVE_CHANGES':'Save Changes',
         'GO':'Go!',
         'OPEN':'Open'
            

     };

     return {
        get: function(name) { return private[name]; }
    };
})();
