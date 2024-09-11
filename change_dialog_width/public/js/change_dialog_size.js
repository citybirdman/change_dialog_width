

$(document).on("list_sidebar_setup", function(){
    frappe.ui.form.QuickEntryForm.prototype.render_dialog = async function(){
        var me = this;
              this.dialog = new frappe.ui.Dialog({
                  title: __("New {0}", [__(this.doctype)]),
                  fields: this.mandatory,
                  doc: this.doc,
              });
      
              this.register_primary_action();
              !this.force && this.render_edit_in_full_page_link();
              // ctrl+enter to save
              this.dialog.wrapper.keydown(function (e) {
                  if ((e.ctrlKey || e.metaKey) && e.which == 13) {
                      if (!frappe.request.ajax_count) {
                          // not already working -- double entry
                          me.dialog.get_primary_btn().trigger("click");
                          e.preventDefault();
                          return false;
                      }
                  }
              });
      
              this.dialog.onhide = () => (frappe.quick_entry = null);
              let d_width = await frappe.db.get_single_value("Quick Entry Settings", "dialog_width");
              console.log(d_width);
              this.dialog.$wrapper.find('.modal-dialog').addClass(d_width);
              this.dialog.show();
      
              this.dialog.refresh_dependency();
              this.set_defaults();
      
              if (this.init_callback) {
                  this.init_callback(this.dialog);
              }
              console.log(this.dialog)
      }
});