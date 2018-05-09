$(document).ready(function(){
$(window).unload(function(){});
  $('#page-wrapper').css('min-height',$(window).height());
 $(document).on('click',"#lang_dropdown",function(){
 window.location.href=CONFIG.get('SITE_NAME')+'LanguageSwitcher/switchLang/'+$(this).attr('data-value');
 });
  $(window).resize(function(){
    $('#page-wrapper').css('min-height',$(window).height());
  });

            
   
            jQuery(document).on('click',".delete",function(e){ 
                var name = $(this).attr('id');
                var action = $(this).attr('data-action');
                 
                 
                  jQuery(document).on('click',".delstatus",function(e){ 
                    if($(this).attr('data-value') == 0)
                    {
                      console.log("false");
                      return false;
                    }
                    else if($(this).attr('data-value') == 1)                  
                    {
                   $("#"+name).closest("tr").hide();  
              

                e.preventDefault();
                 jQuery.ajax({
                      url: CONFIG.get('SITE_NAME')+action,
                       data: { 'id':name},
                      type: 'Post',
                      
                      success: function(data) {
                       
                        var res = jQuery.parseJSON(data);

                        if(res.success == "true")
                        {       
                                 jQuery('.alert-success').html(CONFIG.get('SUCCESS_MESSAGE'));
                                  jQuery('.alert-success').addClass('show');
                                   setTimeout(function() {
                                        $(".alert-success").hide('blind', {}, 500);
                                        jQuery('.alert-success').removeClass('show');
                                    }, 3000);

                            return;
                        }
                      },
                      error: function() {
                         jQuery('.alert-danger').html(CONFIG.get('ERROR_MESSAGE'));
                         jQuery('.alert-danger').addClass('show');
                          setTimeout(function() {
                            $(".alert-danger").hide('blind', {}, 500);
                            jQuery('.alert-danger').removeClass('show');
                            }, 3000);
                         return;
                      },
                      
                   });
                  }
                 });
              
              
            });


       $(document).on('click',".close",function(){

        $("#formid").trigger( "reset" ); 
        $('.text1').removeClass('list-selected');                        
        $("#formid #csave").html('<strong>Save</strong>');
        $("#formid #csave").attr('data-count','');  
       $('.uinactive').removeClass('active-btn');
      $('.uactive').addClass('active-btn');

      $('.uinactive').removeClass('useractive');
          
      $('.uactive').removeClass('useractive');          
       });


       $(document).on('click',"#close_form",function(){

      $("#formid").trigger( "reset" ); 
      $('.text1').removeClass('list-selected');                        
      $("#formid #csave").html('<strong>Save</strong>');
      $("#formid #csave").attr('data-count','');      
       $('.uinactive').removeClass('active-btn');
      $('.uactive').addClass('active-btn');

      $('.uinactive').removeClass('useractive');
          
      $('.uactive').removeClass('useractive');     
       });



/*
       $(document).on('click',"#csave",function(){

      $("#formid").trigger( "reset" );                         
      
       });*/


      $(document).on('click',"#csave",function(){ 
        var count = $('#count').val();
        var editIndex = $('#csave').attr('data-count');
        var clickable = $("#click").val();
        //alert(clickable);
/*        var isClickable =0;
       $('.list-selected').each(function(){
        isClickable = isClickable+1;
       });*/
       

        if(editIndex !='')
        {
            
            if(editIndex == 1) 
              editIndexId='';
            else
              editIndexId = editIndex;
           // $('#item_name'+editIndexId).remove();
           // $('#item_description'+editIndexId).remove();
            //$('#document_name'+editIndexId).remove();
            //$('#document_link'+editIndexId).remove();
            count = editIndex;
        }
        else
        {
            if(count =='')
            {
              count =1;
            }
            else
            {
              count =parseInt(count) +1;
            }
            $('#count').val(count);
        }
        

      
        var description = $("#desc").val();  
        if(description=='')
        {
           $(".desc_error").html('this field is required');
           return;
        } 
        $(".desc_error").html('');
        var document_name = $("#formid input[name=doc_name]").val();  
        if(document_name=='')
        {
            $(".doc_error").html('this field is required');
             return;
        }  
        $(".doc_error").html('');       
        var document_link = $("#formid input[name=doc_link]").val(); 


        if ($("#item_description").val() == '') 
        {
            $("#item_description").val(description);
        } 
        else 
        {
            $("#item_description").after(
                "<input hidden name='item_description[]' value='"+description+"' id='item_description"+count+"' />"
            );
        }

         if ($("#document_name").val() == '') 
        {
            $("#document_name").val(document_name);
        } 
        else 
        {
            $("#document_name").after(
                "<input hidden name='document_name[]' value="+document_name+" id='document_name"+count+"' />"
            );
        }

        if ($("#document_link").val() == '') 
        {
            $("#document_link").val(document_link);
        } 
        else 
        {
            $("#document_link").after(
                "<input hidden name='document_link[]' value="+document_link+"  id='document_link"+count+"' />"
            );
        }

        if ($("#clickable").val() == '') 
        {
            $("#clickable").val(clickable);
        } 
        else
        {
            $("#clickable").after(
                "<input hidden name='clickable[]' value="+clickable+" id='clickable"+count+"' />"
            );

        }

    if(editIndex  !='')
      var html='';
    else
      var html = " <tr class='gradeX' id='inner_table"+count+"'>";
    //html += "<td>"+count+"</td>";
    //html += "<td>"+name+"</td>";
    html+=  "<td><a target='_blank' href='"+document_link+"' id='desc' class='get-div'><i class='fa fa-file-text' style='color: #1477d5; margin-right: 10px; font-size: 28px;'></i><span class='desc_space'>"+description+"</span></a></td>";
    // html+=  "<td>"+document_name+"</td>";
    // html += "<td>"+document_link+"</td>";
    // html += "<td>"+clickable+"</td>";
    if(clickable==1)
    {
      html += "<td><a  target='_blank' href='"+document_link+"'>";
      html+=" <i class='fa fa-dot-circle-o' id='circle_div'></i></a></td>";
    }
    else
    {
      html +="<td></td>";
    }
    html += "<td><div class='btn-group active-btn'><button type='button' class='btn btn-primary dropdown-toggle' data-toggle='dropdown' aria-haspopup='true' aria-expanded='false'>";
    html += "<span style='font-family:FontAwesome;' id='cache10'></span> <span class='caret'></span>";
    html +=  "</button>";
    html += "<ul class='dropdown-menu'> ";
    html +=  " <li><a href='#' class='jsedit' data-toggle='modal' data-target='#html2divid' data-id='"+count+"'>"+CONFIG.get('EDIT')+"</a></li>";
    html += "<li role='separator' class='divider'></li>";
    html +=" <li><a href='#' type='button' class='jsdelete' data-id='"+count+"'>"+CONFIG.get('DELETE')+"</a></li>";
    html +=" </ul></div></td>";
    if(editIndex  =='')
      html += "</tr>";
  
    if(editIndex  !='')
    {
      $("#inner_table"+editIndex).html('');
      $("#inner_table"+editIndex).html(html);
    }
    else
      $("#last").append(html);

  $('.ui-dialog-titlebar-close').click();
    $('.showit').show();
    $("#formid #csave").html('<strong>Save</strong>');
    $("#formid #csave").attr('data-count','');
    $("#formid").trigger( "reset" );  
    $("#click").val('1');
       $('.uinactive').removeClass('active-btn');
      $('.uactive').addClass('active-btn');                         
      
});

        $(document).on('click',".jsdelete",function()
        {    if (!confirm("Are you sure?")) 
            {
                return false;
            }
    
            $(this).closest('tr').remove();
            var trId = $(this).attr('data-id');
            if(trId == 1) trId='';
            //$('#item_name'+trId).remove();
            $('#item_description'+trId).remove();
            $('#document_name'+trId).remove();
            $('#document_link'+trId).remove();
        });

         $(document).on('click',".jsedit",function()
        {   
            var trId = $(this).attr('data-id');
            $('#csave').attr('data-count',trId);
            var click = $("#click").val();
            //alert(click);
            $('#csave').html('<strong>'+CONFIG.get('UPDATE')+'</strong>');
           /***************************/
            $("#formid").html($("#htmldivid").html());
            //$('#formid').dialog('open');
           /***************************/
           if(trId == 1) trId='';
            $("#desc").val($('#item_description'+trId).val());  
            $("#formid input[name=doc_name]").val($('#document_name'+trId).val());
            $("#formid input[name=doc_link]").val($('#document_link'+trId).val()); 
                           if(click =='1')
                           {
                                $('.uactive').addClass('active-btn');
                                $('.uinactive').removeClass('active-btn');
                           }                           
                           if(click =='0')
                           {
                                $('.uinactive').addClass('active-btn');
                                $('.uactive').removeClass('active-btn');
                           }              
           
        });


    
       


       $(document).on('click',".close",function(){

   $(".detail-form").trigger( "reset" );                         
      
       });


                jQuery(document).on('click',".edit_items",function(e){   
              
               var checklist_item_id = $(this).attr('id');
                var clickable = $('this').attr('data-value');

               var action = $(this).attr('data-action');
                e.preventDefault();
                 jQuery.ajax({
                      url: CONFIG.get('SITE_NAME')+action,
                       data: { 'id':checklist_item_id},
                      type: 'Post',
                      
                      success: function(data) {
                       
                        var res = jQuery.parseJSON(data);

                        if(res.success == true)
                        {       
                              
                             $(".detail-form").html();
                            //$('.detail-form').dialog('open');
                            console.log(res.checklist_item[0]);
                            //$('.detail-form input[name=name1]').val(res.checklist_item[0].item_name);
                            //$("#name1").val(res.checklist_item[0].item_name);
                            console.log(res.checklist_item[0].item_description);
                            $('#items-desc').val(res.checklist_item[0].item_description);
                           // $('.detail-form input[name=items-doc_name]').val(res.checklist_item[0].document_name);
                            $('.detail-form input[name=items-doc_link]').val(res.checklist_item[0].document_link);
                           if(res.checklist_item[0].clickable =='1')
                           {

                             $('.uyes').addClass('active-btn');
                           }
                               
                                //$('.uno').removeClass('active-btn');

                            else
                            {
                                $('.uno').addClass('active-btn');
                                $('.uyes').removeClass('active-btn');                             
                            }
                              
                            $("#checklistitemid").val(checklist_item_id);
                            $(".detail-form #isave").html('<strong>Update</strong>');
                             $(".detail-form #isave").attr('data-action',CONFIG.get('SITE_NAME')+CONFIG.get('UPDATE_CHECKLIST_ITEM_ACTION'));
                            return;
                        }
                      },
                      error: function() {
                         jQuery('#info').html('<p style="color:red;">'+CONFIG.get('ERROR_MESSAGE')+'</p>');
                         return;
                      },
                      
                   });
               

            });       
            
 jQuery(".add_new").click(function(e){   

    $(".detail-form").html();
    //$('.detail-form').dialog('open');
    $(".detail-form #isave").html('<strong>Save</strong>');
 });

       $(document).on('click',".close, .closeItems",function(){

 $('form#detail-form input[type="text"],texatrea, select').val(''); 
 $(".list").find('p').removeClass('list-selected'); 
 $("#items-desc").val('');    
});

      $(document).on('click',"#isave",function(){ 


        var clickable = $("#clickableid").val();
        var action = $(this).attr('data-action');
        var checklistId = $(this).attr('data-id');
        var description = $(".detail-form textarea[name=items-desc]").val();  
        //var document_name = $(".detail-form input[name=items-doc_name]").val();  
        var document_link = $(".detail-form input[name=items-doc_link]").val(); 
        var checklist_item_id = $("#checklistitemid").val();
        
      var val = description.substr(0, 1).toUpperCase() + description.substr(1).toLowerCase();       
        
        if(description=='')
        {
           $(".desc_error").html('this field is required');
           return;
        } 
        $(".desc_error").html('');
        
        // if(document_name=='')
        // {
        //     $(".doc_error").html('this field is required');
        //      return;
        // }  
        $(".doc_error").html('');       
        
         if(document_link=='')
        {
          $(".link_error").html('this field is required');
           return;
        }       
        $(".link_error").html('');

        if(clickable=='')
        {
           $(".clickable_error").html('this field is required');
           return;
        } 
        $(".clickable_error").html('');

        //$(".gradeX").append(html);
         jQuery.ajax({
                      url: action,
                       data: {
                       'item_description':description,
                       'document_link':document_link,
                       'checklist_id' :checklistId,
                       'clickable':clickable,
                       'checklist_item_id':checklist_item_id
                        },
                        type: 'Post',
                      
                      success: function(data) {
                            var html='';
                        var res = jQuery.parseJSON(data);
                        console.log(res.checklist_item);

                        $(".detail-form").trigger( "reset" );                         
                       
                           $('.close').click();
                       
                        if(res.success == true)
                        {   
                            
                            if(checklist_item_id =='')
                            {
                                $("#checklistitemid").val(res.checklist_item);

                            html = "<tr class='gradeX'>";
                            html+=  "<td id='descTr"+res.ckItemId+"'><a target='_blank' href='"+document_link+"' id='desc"+res.ckItemId+"' class='get-div'><i class='fa fa-file-text' style='color: #1477d5; font-size: 28px;'></i><span class='desc_space'>"+val+"</span></a></td>";
                            html +="<td id='clickTr"+res.ckItemId+"'>";
                            if(clickable==1)
                            {
                              html += "<a  target='_blank' href='"+document_link+"'>";
                              html+=" <i class='fa fa-dot-circle-o' id='circle_div'></i></a>";
                            }
                            html+="</td>";
                           // html+=  "<td><span id='doc"+res.checklist_item+"' class='get-div'>"+document_name+"</span></td>";
                            //html += "<td><span id='link"+res.checklist_item+"' class='get-div'>"+document_link+"</span></td>";
                            html += "<td><div class='btn-group action-btn'><button type='button' class='btn btn-primary dropdown-toggle' data-toggle='dropdown' aria-haspopup='true' aria-expanded='false'>";

                            html += "<span style='font-family:FontAwesome;' id='cache10'></span> <span class='caret'></span>";
                            html +=  "</button>";
                            html += "<ul class='dropdown-menu'>";
                            html +=  "<li><a href='#' data-toggle='modal' data-target='#items-div' type='button' class='edit_items' id='"+res.ckItemId+"' data-action='checklist/datail_checklist_edit'>"+CONFIG.get('EDIT')+"</a></li>";
                            html += "<li role='separator' class='divider'></li>";
                            html +="<li><a href='#' style='color:red;' type='button' id='"+res.ckItemId+"'  data-toggle='modal' data-target='#delete-modal' class='delete' data-action='checklist/deleteChecklistTemplateItem/"+res.checklist_id+"'>"+CONFIG.get('DELETE')+"</a></li>";
                            html +="</ul></div></td>";
                            html += "</tr>";
                            $(".ibox-content tbody").append(html);
                            $("#checklistitemid").val('');
                                 jQuery('.alert-success').html(CONFIG.get('SUCCESS_ADDED_MESSAGE'));
                                  jQuery('.alert-success').addClass('show');
                                   setTimeout(function() {
                                        $(".alert-success").hide('blind', {}, 500);
                                        jQuery('.alert-success').removeClass('show');
                                    }, 3000);

                            }
                            else
                            {
                                if(clickable==1)
                                {
                                $("#clickTr"+checklist_item_id).html("<a  target='_blank' href='"+document_link+"'><i class='fa fa-dot-circle-o' id='circle_div'></i></a>");                                  
                                }
                                else if(clickable==0)
                                {
                                  $("#clickTr"+checklist_item_id).html("");
                                }                              
                                $("#items-desc"+checklist_item_id).html(description);
                                $("#descTr"+checklist_item_id).html("<a target='_blank' href='"+document_link+"' id='desc"+checklist_item_id+"' class='get-div'><i class='fa fa-file-text' style='color: #1477d5; font-size: 28px;'></i><span class='desc_space'>"+val+"</span></a>");
/*                                $("#descTr"+checklist_item_id).append(description);
                                $("#descTr"+checklist_item_id).append("</a>");*/
                                //$("#items-doc"+checklist_item_id).html(document_name);
                                $("#items-link"+checklist_item_id).html(document_link);

                                  jQuery('.alert-success').html(CONFIG.get('SUCCESS_UPDATED_MESSAGE'));
                                  jQuery('.alert-success').addClass('show');
                                   setTimeout(function() {
                                        $(".alert-success").hide('blind', {}, 500);
                                        jQuery('.alert-success').removeClass('show');
                                    }, 3000);                               
                            }
                        }
                           },
                      error: function() {
                         jQuery('#info').html('<p style="color:red;">'+CONFIG.get('ERROR_MESSAGE')+'</p>');
                         return;
                      },
                      
                   });
                });


//checklist list view 
  $(document).on('click',".list",function(){

   
   $(".list").find('p').removeClass('list-selected');
   $(this).find("p").addClass('list-selected');
   var clickableVal = $(this).find("p").attr('data-value');
   $("#clickableid").val(clickableVal);

});

  //clist
  $(document).on('click',".clist",function(){

   var clickableVal = $(this).find("p").attr('data-value');
   var clickValue = $("#selected-div").val();



    if($(this).find("p").hasClass('list-selected'))
    {
         $(this).find("p").removeClass('list-selected');
     
        if($("#click").val() == clickableVal)
            $("#clickableid").val('');
        else
        {   
            //alert(removeValue($("#department_id").val(),department_id));
            $("#selected-div").val(removeValue(clickValue,$(this).attr('data-id')));
        }
    }
    else
    {   
       $(this).find("p").addClass('list-selected');
        if($("#selected-div").val() =='')
           $("#selected-div").val($(this).attr('data-id'));
        else
      $("#selected-div").val($("#selected-div").val()+','+$(this).attr('data-id'));   
   }

//alert($(this).attr('data-id'));
});

function removeValue(list, value) {
  list = list.split(',');
  list.splice(list.indexOf(value), 1);
  return list.join(',');
}

   $(document).on('click',".iilist",function(){
    var department_id = $(this).find("p").attr('data-value');
    if($(this).find("p").hasClass('list-selected'))
    {
         $(this).find("p").removeClass('list-selected');
        
        if($("#department_id").val() == department_id)
            $("#department_id").val('');
        else
        {   
            //alert(removeValue($("#department_id").val(),department_id));
            $("#department_id").val(removeValue($("#department_id").val(),department_id));
        }
    }
    else
    {   
       $(this).find("p").addClass('list-selected');
        if($("#department_id").val() =='')
            $("#department_id").val(department_id);
        else
            $("#department_id").val($("#department_id").val()+','+department_id);
    }
   

});

  $(document).on('click',"#save_button",function(){
   
    var ckid = $(this).attr('data-checklistid');
   // console.log(id);
   var divIds = $("#selected-div").val();
   $("#myspan"+ckid).attr("data-select",divIds);
   list = divIds.split(',');
    //console.log(list)
    if(list =='')
      listLength = '0';
    else
      listLength = list.length;
   // alert(listLength);
   var ids='';
   var count=0;
   $('.list-selected').each(function(){ count++;
  ids +=','+ $(this).parent().attr('data-id');
   });
   console.log(count);
   ids = ids.slice(1);

      var action = CONFIG.get('SITE_NAME')+"checklist/updateDivisions";
      console.log(action);
                 jQuery.ajax({
                      url:action,
                       data: { 'id':divIds,'checklist_id':ckid},
                      type: 'Post',
                      
                      success: function(data) {
                       
                        var res = jQuery.parseJSON(data);
                        var html = '';
                        if(res.success == true)
                        {  
                         $("#myspan"+ckid).contents().filter(function(){ 
                              return this.nodeType == 3; 
                        })[0].nodeValue = listLength ;
                                 jQuery('.alert-success').html(CONFIG.get('SUCCESS_DIVISION_MESSAGE'));
                                  jQuery('.alert-success').addClass('show');
                                   setTimeout(function() {
                                        $(".alert-success").hide('blind', {}, 500);
                                        jQuery('.alert-success').removeClass('show');
                                    }, 3000);                             
                        }
                      },
                      error: function() {
                         return;
                      },
                      
                   });

      //console.log(id);
  //alert(id);


});


//Checklist list view popup search functionality
 $(document).on('keydown','#check_dept_search',function (e) {
 var key = e.which;
 if(key == 13)  // the enter key code
  {
   // alert("sdjsjd"); return;
    $('#check_go').click();
    return false;  
  } 
});

  $(document).on('click',"#check_go",function(){

        var name = $("#check_dept input[name=check_dept_search]").val();  
          //var action = $(this).attr('data-action');
          //console.log(document_name);
              var action = $(this).attr('data-action');
              var checklistid = $(this).attr('data-checklistid');
              console.log(checklistid);
              var selectedDiv =$("#selected-div").val();
              var selectedId = $('#myspan'+checklistid).attr('data-select');
              console.log(selectedId);
              selectedId = selectedId.split(',');
               selectedDiv = selectedDiv.split(',');
                 jQuery.ajax({
                      url:action,
                       data: { 'division_search':name,'checklistid':checklistid},
                      type: 'Post',
                      
                      success: function(data) {
                       
                        var res = jQuery.parseJSON(data);
                        var html ='';
                         var cssClass ='';
                        if(res.success == "true")
                        {       
                            for(var i=0;i<res.total_rows;i++)
                              {
                                  if(jQuery.inArray(res.divisions[i].id, selectedId) !== -1)
                                        cssClass = 'list-selected';
                                  else if(jQuery.inArray(res.divisions[i].id, selectedDiv) !== -1)
                                        cssClass = 'list-selected';
                                  else
                                        cssClass ='';
                                     
                                   html += "<span class='selected clist' data-id='"+res.divisions[i].id+"'>";
                                   if(typeof(res.institutes_name[i])==='undefined')
                                   {
                                    html +="<p class='div-select text "+cssClass+"' id='"+res.divisions[i].id+"'>"+res.divisions[i].name+"</p></span>";
                                   }
                                   else
                                   {
                                    html +="<p class='div-select text "+cssClass+"' id='"+res.divisions[i].id+"'>"+res.institutes_name[i]+" - "+res.divisions[i].name+"</p></span>";                                    
                                   }
                                
                                    
                                  
                                }
                         
                          $(".dept_box").html(html);
                         // return false;
                        }
                        else
                        {
                          html +="<p>No result found</p>";
                          $("#inner-box").html(html);                          
                        }
                      },
                      error: function() {


                        // jQuery('#info').html('<p style="color:red;">'+CONFIG.get('ERROR_MESSAGE')+'</p>');
                         return;
                      },
                      
                   });


  });




// Checklist list view division popup window

        $(document).on('click',".check-div",function(){

              var name = $(this).attr('data-name');
              var inst_name = $(this).attr('data-inst-name');
              var id= $(this).attr('data-id');
              var ckid= $(this).attr('data-checklistid');
              var action = CONFIG.get('SITE_NAME')+'division/search_check_department';
              var selectedId= $(this).attr('data-select');
              var selectedDiv =$("#selected-div").val();
              //if(selectedId !='')
                $("#selected-div").val(selectedId);
              //else
               // selectedId = $("#selected-div").val();
              selectedId = selectedId.split(',');
             // var numbers = name.replace(/ *, */g, '<br>');
                //console.log($(this).clone().find('span').remove().end().text());
                var instList = inst_name.split(',');
             var newList = name.split(',');
             var newList1 = id.split(',');

             var result ='';
                      
              result += "<div class='input-group'>";
              result += "<input type='text' placeholder='Search' name='check_dept_search' id='check_dept_search' class='input-sm form-control'> ";
              // result += "</div>";
              result += "<span class='input-group-btn'>";
              result += " <button style='font-size:12px;' type='button' class='btn btn-sm btn-primary' id='check_go' data-action='"+CONFIG.get('SITE_NAME')+"division/search_check_department' data-checklistid="+ckid+">"+CONFIG.get('GO')+"</button> </span>";
              result += "</div><div class='clear-div'></div><div id='inner-box'>";
              result += "<div class='hr-line-dashed'></div>";
              //result += "<ul style='list-style: none;' class='new'>";
              result +="<ul class='dept_box'>";
              var cssClass ='';
              var dname= '';
              jQuery('.modal_loader').show();
              jQuery.ajax({
                      url:action,
                       data: { 'division_search':dname,'checklistid':ckid},
                      type: 'Post',
                      
                      success: function(data) {
                       
                        var res = jQuery.parseJSON(data);
                        var html ='';
                         var cssClass ='';
                        if(res.success == "true")
                        { 
                            jQuery('.modal_loader').hide();      
                            for(var i=0;i<res.total_rows;i++)
                              {
                                  if(jQuery.inArray(res.divisions[i].id, selectedId) !== -1)
                                        cssClass = 'list-selected';
                                  else if(jQuery.inArray(res.divisions[i].id, selectedDiv) !== -1)
                                        cssClass = 'list-selected';
                                  else
                                        cssClass ='';
                                     
                                   result += "<span class='selected clist' data-id='"+res.divisions[i].id+"'>";
                                   if(typeof(res.institutes_name[i])==='undefined')
                                   {
                                    result +="<p class='div-select text "+cssClass+"' id='"+res.divisions[i].id+"'>"+res.divisions[i].name+"</p></span>";
                                   }
                                   else
                                   {
                                    result +="<p class='div-select text "+cssClass+"' id='"+res.divisions[i].id+"'>"+res.institutes_name[i]+" - "+res.divisions[i].name+"</p></span>";                                    
                                   }
                                
                                    
                                  
                                }
                          result+="</ul>"
             
              result +="</div><div class='hr-line-dashed'></div><div class='form-group float-e-margins text-right'><button class='btn btn-white' data-dismiss='modal' aria-label='Close' type='button'><strong>"+CONFIG.get('CLOSE')+"</strong></button>";
              result += "<button  data-action='"+CONFIG.get('SITE_NAME')+"checklist/updateDivisions'  class='btn btn-primary'  type='button' id='save_button' data-dismiss='modal' aria-label='Close'  data-checklistid="+ckid+"><strong>"+CONFIG.get('SAVE_CHANGES')+"</strong></button>";
              
              result +="</div><span class='result'></span>";
             
                $("#check_dept_div").html(result);
                         // $("#inner-box").html(result);
                         // return false;
                        }
                        else
                        {
                          html +="<p>No result found</p>";
                          $("#inner-box").html(html);                          
                        }
                      },
                      error: function() {


                        // jQuery('#info').html('<p style="color:red;">'+CONFIG.get('ERROR_MESSAGE')+'</p>');
                         return;
                      },
                      
                   });

              
                
        });



// admin dashboard overview

      $(window).load(function(){
        //jQuery('#page-wrapper').css('min-height',jQuery('#page-wrapper').height() + 200);
        setTimeout(function() {
                                        $(".alert-success").hide('blind', {}, 500);
                                        jQuery('.alert-success').removeClass('show');
                                    }, 3000);
                                    
         setTimeout(function() {
                            $(".alert-danger").hide('blind', {}, 500);
                            jQuery('.alert-danger').removeClass('show');
                            }, 3000);

        $("#current").click();
        var windowWidth = $(window).width();
        if( windowWidth < 767){
            windowWidth = windowWidth - 20;
            $('.slider-container').css('width',(windowWidth)*2);
            $('#user-div .user_div,#departid').css('width',windowWidth);
        }else{
            windowWidth = 600
        }
        $('#department').on('click',function(){
            $('.user_div').animate({
                marginLeft : -windowWidth +'px'
            });
        });
        $('#dept-close').on('click',function(){
            $('.user_div').animate({
                marginLeft : '0'
            });
        });

        $("#division_search, #user_search, #inst_search, #area_search, #checklist_search, #checklist_item_search, #announcements_search").on('keyup',function(){ 
            var textLength = $(this).val().length;
            
            if(textLength > 1 )
            {

                $('.remove-icon').removeClass('hidden');

            }
            else
            {
                $('.remove-icon').addClass('hidden');

            }
        });

        $('.remove-icon').click(function(){
             $(this).addClass('hidden'); 
             var id = $(this).parent().parent().attr("id");
            $("#division_search, #user_search, #inst_search, #area_search, #checklist_search,#checklist_item_search, #announcements_search").val('');
          var url = $(location).attr('href');
      var segments = url.split( '/' );
      segments[segments.length-1] ='lists';
       if("search_checklist_item_form" ==id)
             {
                $("#search_checklist_item_form").submit();
                return;
             }
          window.location.href = segments.join("/"); 

        });


      });

      $(document).on('click',"#current",function(e){ 
            e.preventDefault();
            var action = $(this).attr('data-action');
            jQuery.ajax({
                      url: action,
 
                        type: 'Post',
                      
                      success: function(data) {
                            var html='';
                        var res = jQuery.parseJSON(data);
                        if(res.success == true)
                        {  
                            console.log(res);

                                    var html = "<tr class='gradeX'>";
                              for(var i=0;i<res.division.length;i++)
                              {
                                  //console.log(res.checklist_date[i].month);
                                    if(typeof  res.division[i][0] != 'undefined')
                                    {
                                      if(res.private_comments[i] != '')
                                      {
                                        var comment = "<i class='fa fa-comments'></i>";
                                      }
                                      else
                                      {
                                        var comment = "None";
                                      }

                                      if(res.item_comments_count[i] != '')
                                      {
                                        var ad_comment = "<i class='fa fa-comments'></i>";
                                      }
                                      else if(res.item_comments_count[i]==0)
                                      {
                                        var ad_comment = "None";
                                      }                                      





                                        html += "<td>"+res.division[i][0].name+"</td>";
                                        if(res.item_comments_count[i]==0)
                                        {
                                          html +=  "<td class='text-center' id='adminTr"+res.division[i][0].id+"'><a style='color:#787878' href='"+CONFIG.get('SITE_NAME')+"checklist/detailChecklist/divid/"+res.division[i][0].id+"/date/"+res.month+" "+res.year+"/cid/"+res.checklist[i][0].id+"'><span>"+ad_comment+"</span></a></td>";
                                        }
                                        else if(res.item_comments_count[i]!=0)
                                        {

                                          if(res.unread[i]!=0)
                                          {
                                             var read = res.item_comments_count[i]-res.unread[i];
                                          html +=  "<td class='text-center' id='adminTr"+res.division[i][0].id+"'><a style='color:#787878' href='"+CONFIG.get('SITE_NAME')+"checklist/detailChecklist/divid/"+res.division[i][0].id+"/date/"+res.month+" "+res.year+"/cid/"+res.checklist[i][0].id+"'><span style='color:red;'>"+res.unread[i]+" <i class='fa fa-comments'></i> </span>";
                                          if(read==0)
                                          {
                                            html+= "";  
                                          }
                                          else if(read!=0)
                                          {
                                            html+= "<span>"+read+" "+ad_comment+"</span></a></td>";  
                                          }
                                                                                                                              
                                          }
                                          else if(res.unread[i]==0)
                                          {
                                          html +=  "<td class='text-center' id='adminTr"+res.division[i][0].id+"'><a style='color:#787878' href='"+CONFIG.get('SITE_NAME')+"checklist/detailChecklist/divid/"+res.division[i][0].id+"/date/"+res.month+" "+res.year+"/cid/"+res.checklist[i][0].id+"'><span>"+res.item_comments_count[i]+" "+ad_comment+"</span></a></td>";                                          

                                          } 
                                        }
                                        html +=  "<td class='text-center' id='adminCommentsTr"+res.division[i][0].id+"'><span data-division-id='"+res.division[i][0].id+"' data-toggle='modal' data-target='#admin_comments_div' data-action='"+CONFIG.get('SITE_NAME')+CONFIG.get('PRIVATE_COMMENTS_ACTION')+"' class='admin_comments' id='admin_comments' data-id='"+res.checklist[i][0].id+"'>"+res.private_comments[i]+" "+comment+"</span></td>";
                                        html += "<td><div class='btn-group action-btn'><button type='button' class='btn btn-primary dropdown-toggle' data-toggle='dropdown' aria-haspopup='true' aria-expanded='false'>";

                                        html += "<span style='font-family:FontAwesome;' id='cache10'></span> <span class='caret'></span>";
                                        html +=  "</button>";
                                        html += "<ul class='dropdown-menu'>";
                                        // html +=  "<li><a href='#' class='edit'>"+CONFIG.get('EDIT')+"</a></li>";
                                        // html += "<li role='separator' class='divider'></li>";
                                         html +=  "<li><a href='"+CONFIG.get('SITE_NAME')+"checklist/detailChecklist/divid/"+res.division[i][0].id+"/date/"+res.month+" "+res.year+"/cid/"+res.checklist[i][0].id+"'  class='detail'>"+CONFIG.get('OPEN')+"</a></li>";
                                         //html += "<li role='separator' class='divider'></li>";
                                        // html +="<li><a href='#' type='button' class='delete'>"+CONFIG.get('DELETE')+"</a></li>";
                                        html +="</ul></div></td>";
                                        html += "</tr>";
                                    }
                                }
                                    $("#admindiv tbody").html(html);
                                   
                                    $('#lastdiv').hide();
                                    $('#admindiv').show();                                    
                              
                             }
                           },
                            error: function() {
                         jQuery('#info').html('<p style="color:red;">'+CONFIG.get('ERROR_MESSAGE')+'</p>');
                         return;
                      },
                      
                   });
        });


      $(document).on('click',"#last",function(e){ 
            e.preventDefault();
            var action = $(this).attr('data-action');
            jQuery.ajax({
                      url: action,
 
                        type: 'Post',
                      
                      success: function(data) {
                            var html='';
                        var res = jQuery.parseJSON(data);
                        if(res.success == true)
                        {  
                            console.log(res);

                            //console.log(res.division[1][0]);

                                    var html = "<tr class='gradeX'>";
                              for(var i=0;i<res.division.length;i++)
                              {
                                      if(res.private_comments[i] != '')
                                      {
                                        var comment = "<i class='fa fa-comments'></i>";
                                      }
                                      else
                                      {
                                        var comment = "None";
                                      }

                                      if(res.item_comments_count[i] != '')
                                      {
                                        var ad_comment = "<i class='fa fa-comments'></i>";
                                      }
                                      else if(res.item_comments_count[i]==0)
                                      {
                                        var ad_comment = "None";
                                      }                                      
                                    html += "<td>"+res.division[i][0].name+"</td>";
                                        if(res.item_comments_count[i]==0)
                                        {
                                          html +=  "<td class='text-center' id='adminTr"+res.division[i][0].id+"'><a style='color:#787878' href='"+CONFIG.get('SITE_NAME')+"checklist/detailChecklist/divid/"+res.division[i][0].id+"/date/"+res.month+" "+res.year+"/cid/"+res.checklist[i][0].id+"'><span>"+ad_comment+"</span></a></td>";
                                        }
                                        else if(res.item_comments_count[i]!=0)
                                        {

                                          if(res.unread[i]!=0)
                                          {
                                             var read = res.item_comments_count[i]-res.unread[i];
                                          html +=  "<td class='text-center' id='adminTr"+res.division[i][0].id+"'><a style='color:#787878' href='"+CONFIG.get('SITE_NAME')+"checklist/detailChecklist/divid/"+res.division[i][0].id+"/date/"+res.month+" "+res.year+"/cid/"+res.checklist[i][0].id+"'><span style='color:red;'>"+res.unread[i]+" <i class='fa fa-comments'></i> </span>";
                                          if(read==0)
                                          {
                                            html+= "";  
                                          }
                                          else if(read!=0)
                                          {
                                            html+= "<span>"+read+" "+ad_comment+"</span></a></td>";  
                                          }
                                                                                                                              
                                          }
                                          else if(res.unread[i]==0)
                                          {
                                          html +=  "<td class='text-center' id='adminTr"+res.division[i][0].id+"'><a style='color:#787878' href='"+CONFIG.get('SITE_NAME')+"checklist/detailChecklist/divid/"+res.division[i][0].id+"/date/"+res.month+" "+res.year+"/cid/"+res.checklist[i][0].id+"'><span>"+res.item_comments_count[i]+" "+ad_comment+"</span></a></td>";                                          

                                          } 
                                        }                                 

                                        html +=  "<td class='text-center' id='adminCommentsTr"+res.division[i][0].id+"'><span data-division-id='"+res.division[i][0].id+"' data-toggle='modal' data-target='#admin_comments_div' data-action='"+CONFIG.get('SITE_NAME')+CONFIG.get('PRIVATE_COMMENTS_ACTION')+"' class='admin_comments' id='admin_comments' data-id='"+res.checklist[i][0].id+"'>"+res.private_comments[i]+" "+comment+"</span></td>";

                                    html += "<td><div class='btn-group action-btn'><button type='button' class='btn btn-primary dropdown-toggle' data-toggle='dropdown' aria-haspopup='true' aria-expanded='false'>";

                                    html += "<span style='font-family:FontAwesome;' id='cache10'></span> <span class='caret'></span>";
                                    html +=  "</button>";
                                    html += "<ul class='dropdown-menu'>";
                                     html +=  "<li><a href='"+CONFIG.get('SITE_NAME')+"checklist/detailChecklist/divid/"+res.division[i][0].id+"/date/"+res.month+" "+res.year+"/cid/"+res.checklist[i][0].id+"'  class='detail'>"+CONFIG.get('OPEN')+"</a></li>";
                                    // html += "<li role='separator' class='divider'></li>";
                                   // html +="<li><a href='#' type='button' class='delete'>"+CONFIG.get('DELETE')+"</a></li>";
                                    html +="</ul></div></td>";
                                    html += "</tr>";
                                }
                                    $("#lastdiv tbody").html(html);   
                                    // $('#current').css('background-color','#1AB394');;
                                    // $('#last').css('background-color','#428bca');;
                                    $('#admindiv').hide();  
                                    $('#lastdiv').show();
                              
                             }
                           },
                            error: function() {
                         jQuery('#info').html('<p style="color:red;">'+CONFIG.get('ERROR_MESSAGE')+'</p>');
                         return;
                      },
                      
                   });
      });

      jQuery('.nav > li > a > .nav-label ').click(function(e){
            e.preventDefault();
            window.location.href = jQuery(this).parent('a').attr('href'); 
        });


});

        $(document).on('click',".custom-check-user",function(){

           var id =   $(this).attr('data-id'); 
           var ischecked = $("#custom-check"+id).is(":checked");
           $("#custom-check"+id).is(":checked");
          var total_items = $(this).attr('data-items');
          var div_id =   $(this).attr('data-division-id'); 
          var checklist_id =   $(this).attr('data-checklist-id'); 
          var checked = $(".custom-checkbox").attr('data-checked'); 
          var action = $(this).attr('data-action');
          var row = $(this).attr('data-row');
         if(ischecked ==1)
            checked = 0;
          else
            checked =1;

                              jQuery.ajax({
                      url:action,
                       data: {'checklist_item_id':id,
                       'division_id':div_id,
                       'checklist_id':checklist_id,
                       'checked':checked},
                      type: 'Post',
                      
                      success: function(data) {
                       
                          var res = jQuery.parseJSON(data);
                          var html = '';
                        if(res.success == true)
                        { 
                        //$("input.chechlist-chek").attr('disabled',true);    
                            jQuery("#changeTr"+id).html(res.case_user_name+"<br/>"+res.user_date+", "+res.time);  
                            if(res.checked=="1")
                            {
                              $('.custom-check-user').attr('data-checked', "0");
                            }

                            else if(res.checked=="0")
                            {
                              $('.custom-check-user').attr('data-checked', "1");
                            }
                            if(total_items==res.check)
                            {
                             $('.complete-check').prop('disabled', false);
                             $('.complete-check').attr('data-action', CONFIG.get('SITE_NAME')+CONFIG.get('SUBMIT_CHECKLIST_ACTION'));
                             $('.complete-check').attr('data-checklist-id', checklist_id);
                             $('.complete-check').attr('data-division-id', div_id);
                             $('.complete-check').attr('data-toggle', "modal");
                             $('.complete-check').attr('data-target', "#submit-modal");
                             $('.complete-check').attr('data-row-id', row);
                            }
                            else if(checked ==0)
                            {
                               $('.complete-check').prop('disabled', true);
                            }               
                        }
                      },
                      error: function() {
                       //  jQuery('#divformid').html('<p style="color:red;">'+CONFIG.get('ERROR_MESSAGE')+'</p>');
                         return;
                      },
                      
                   });
            });

/*
$(document).on('click','.navbar-minimalize',function(){


  var className = $('.pace-done').attr('class');
  
  if(className == "pace-done")
  {
    localStorage.setItem('isExpanded','true');

  }

  else if(className == "pace-done mini-navbar")
  {
    localStorage.setItem('isExpanded','false');
  }      
    
    var taste = localStorage.getItem('isExpanded');




    $(window).onload(function(){

      //alert(taste);
     if(taste=="true")
     {
        $("body").removeClass( "mini-navbar  pace-done" ).addClass( "pace-done" );      
     }

     else if(taste=="false")
     {
      $("body").removeClass( "pace-done" ).addClass( "pace-done mini-navbar" );
     }
  });

});*/





 $(document).on('click','.navbar-minimalize',function(){

  var isExpended ='';
  var className = $('.pace-done').attr('class');
  
  if(className == "pace-done")
  {
   isExpended ='true';

  }

  else if(className == "pace-done mini-navbar")
  {
   isExpended ='false';
  }      
    
    var action = CONFIG.get('SITE_NAME')+CONFIG.get('BODY_ACTION');
    //alert(action);

                             jQuery.ajax({
                      url:action,
                       data: {'bodyClass':isExpended},
                      type: 'Post',
                      
                      success: function(data) {
                       
                          var res = jQuery.parseJSON(data);

                        if(res.success == true)
                        { 
             
                        }
                      },
                      error: function() {
                       //  jQuery('#divformid').html('<p style="color:red;">'+CONFIG.get('ERROR_MESSAGE')+'</p>');
                         return;
                      },
                      
                   });
});


