var CoreSelect2 = (() => {
  return {
    initJson: (object, params = {}, select2_options = {}) => {
      return object.select2({
        ...select2_options,
        ajax: {
          url: jHelperDb,
          dataType: "json",
          type: "POST",
          quietMillis: 50,
          delay: 250,
          data: function (data) {
            return {
              searchTerm: data.term,
              ...params,
            };
          },
          processResults: function (data) {
            return {
              results: data.select2data,
            };
          },
          cache: true,
        },
      });
    },
    initAjax: (object, params = {}, select2_options = {}) => {
      return object.select2({
        ...select2_options,
        ajax: {
          url: jModuleDb,
          dataType: "json",
          type: "POST",
          quietMillis: 50,
          delay: 250,
          data: function (data) {
            return {
              searchTerm: data.term,
              ...params,
            };
          },
          processResults: function (data) {
            return {
              results: data.select2data,
            };
          },
          cache: true,
        },
      });
    },
    initData: (object, data, select2_options = {}) => {
      return object.select2({
        data,
        ...select2_options,
      });
    },
    reset: (object) => {
      return object.val(null).trigger("change");
    },
    initDataVal: (object, id) => {
      return object.val(id).trigger("change");
    },
    initAjaxVal: (object, data = {}) => {
      //{"id": 4, "text": 'xxxxx' }
      if (object.find("option[value='" + data.id + "']").length) {
        object.val(data.id).trigger("change");
      } else {
        // Create a DOM Option and pre-select by default
        var newOption = new Option(data.text, data.id, true, true);
        // Append it to the select
        object.append(newOption).trigger("change");
      }
    },
  };
})();

var CoreJs = (function () {
  return {
    alert: (data) => {
      setTimeout(()=>
      CoreAlert.show(data.message_title, data.message_text, 
         data.message_icon ?? "",
         data.message_type ,
      ),500);
    },
    json2html: (sub,data,callback=()=>{}) => {
      let ret = $.ajax({
        url: jModule +sub+"/",
        dataType: "html",
        data: data,
        async: false,
        type: "post",
        success: (data) => {
          return data;
        },
      });
      callback(ret.responseJSON);
    },
    json2db: (data) => {
      let ret = $.ajax({
        url: jModuleDb,
        dataType: "json",
        data: data,
        async: false,
        type: "post",
        success: (data) => {
          return data;
        },
      });
      return ret.responseJSON;
    },
    ajax2db: (data, callback) => {
      let ret = $.ajax({
        url: jModuleDb,
        dataType: "json",
        data: data,
        async: false,
        type: "post",
        success: (data) => {
          return data;
        },
      });
      callback(ret.responseJSON);
    },
    htmlInputNumberDigit: (input, digit = 2, options = {}) => {
      let ops = { default: "01", ...options };
      if (input.value < 0) input.value = Math.abs(input.value);
      if (input.value.length > digit) input.value = input.value.slice(0, digit);
      $(input).blur(function () {
        console.log(ops);

        if (digit == 2) {
          if (input.value.length == 1) input.value = 0 + input.value;
          if (input.value.length == 0 || input.value == 0)
            input.value = ops.default;
        }

        //* if you want to allow insert only 2 digits *//
      });
    },
  };
})();

var CoreLoader = (() => {
  var objButton = $(".btn-loader");
  var htmlLoader =
    '<i class="fa fa-spinner fa-spin  fa-fw"></i><span class="sr-only">กำลังโหลด...</span>';
  var dataImportText = objButton.html();
  return {
    init: (objname) => {
      objButton = $(objname);
      dataImportText = objButton.html();
    },
    show: () => {
      objButton.html(htmlLoader).addClass("disabled");
    },
    hide: (callback = () => {}) => {
      setTimeout(
        () => objButton.html(dataImportText).removeClass("disabled"),
        500
      );
      callback();
    },
  };
})();

var CoreAlert = (() => {
  // include blade : plugins.toast
  var toastTitle = $(".toast-title");
  var toastBody = $(".toast-body");
  var initAlert = (title,body,icon,selectedType) => {
    let toastPlacementExample = document.querySelector(".toast-ex");

    toastPlacementExample.classList.add(selectedType);
    DOMTokenList.prototype.add.apply(
      toastPlacementExample.classList,
      "top-0 end-0".split(" ")
    );
    
    toastTitle.html('<i class="fas ' + icon + ' me-2"></i> ' + title);
    toastBody.html(body);
    
    var toastPlacement = new bootstrap.Toast(toastPlacementExample);
    toastPlacement.show();
  };
  var showAlert = (
    title,
    body,
    icon = "fa-check-circle",
    type = "bg-success"
  ) => {
    //dd('alert :',title,body,icon,type);
    initAlert(title,body,icon,type);
  };
  return {
    success: (title, body, icon = "fa-check-circle") => {
      showAlert(title, body, icon, "bg-success");
    },
    error: (title, body, icon = "fa-times-circle") => {
      showAlert(title, body, icon, "bg-danger");
    },
    warning: (title, body, icon = "fa-exclamation-triangle") => {
      showAlert(title, body, icon, "bg-warning");
    },
    show: (title, body, icon = "fa-info-circle", type = "info") => {
      if (type == "error") {
        type = "danger";
        icon = "fa-times-circle";
      }
      if (type == "success") {
        type = "dark";
        icon = "fa-check-circle";
      }
      if (type == "warning") {
        type = "warning";
        icon = "fa-exclamation-triangle";
      }
      dd("option alert : ", title, body, icon, "bg-" + type);
      showAlert(title, body, icon, "bg-" + type);
    },
    jshow: (title, body, options = {}, callback = () => {}) => {
      let op = { ...{ icon: "fa-info-circle", type: "info" }, ...options };
      if (op.type == "error") {
        op.type = "danger";
        op.icon = "fa-times-circle";
      } else 
      if (op.type == "success") {
        op.type = "success";
        op.icon = "fa-check-circle";
      } else 
      if (op.type == "warning") {
        op.type = "warning";
        op.icon = "fa-exclamation-triangle";
      }
      //dd("jshow : ", title, body, op, options);
      showAlert(title, body, op.icon, "bg-" + op.type);
      callback();
    },
  };
})();

var CoreDataTable = (function () {
  var obj = null;
  var htmlLoader =
    '<i class="fa fa-spinner fa-spin fa-3x fa-fw"></i><span class="sr-only">กำลังโหลด...</span>';
  var datatableOption = {
    ordering: true,
    order: [0, "desc"],
    pageLength: 10,
    oLanguage: {
      oPaginate: {
        sPrevious: "",
        sNext: "",
      },
    },
    lengthChange: false,
    searching: true,
  };

  return {
    initServerSide: (objTable, options = {}) => {
      obj = $(objTable).DataTable({
        ...datatableOption,
        processing: true,
        serverSide: true,
        ordering: false,
        lengthChange: false,
        // language: {
        //   processing: htmlLoader,
        // },
        destroy: true,
        ...options,
      });

      return obj;
    },
    init: (objTable, options = {}) => {
      obj = $(objTable).DataTable({
        ...datatableOption,
        processing: true,
        ordering: false,
        lengthChange: false,
        destroy: true,
        ...options,
      });
      return obj;
    },
  };
})();

function dd(...data) {
  console.log(...data);
}

(function ($, window, document, undefined) {
  var pluginName = "serializeObject";
  var defaults = {
    requiredFormat: {},
  };

  function Plugin(element, options) {
    this.element = element;

    this.options = $.extend({}, defaults, options);

    this._defaults = defaults;
    this._name = pluginName;
  }

  Plugin.prototype.toJsonObject = function () {
    var _this = this;
    var keyValues = _this.replaceEmptyBracketWithNumericBracket(
      $(_this.element).serializeArray()
    );

    var jsonObject = _this.options.requiredFormat;

    $.each(keyValues, function (key, obj) {
      var keys = obj.name.replace(/]/g, "").split("[");
      var vObject = _this.stringArrayKeyToVariable(keys, obj.value);

      jsonObject = $.extend(true, {}, jsonObject, vObject);
    });

    return jsonObject;
  };

  Plugin.prototype.replaceEmptyBracketWithNumericBracket = function (
    keyValues
  ) {
    var lastIndexes = {};
    var newKeyValues = keyValues;

    $.each(newKeyValues, function (key, obj) {
      var keyName = obj.name;
      var hasSquareBrackets = keyName.indexOf("[]");

      if (hasSquareBrackets > -1) {
        lastIndexes[keyName] =
          typeof lastIndexes[keyName] == "undefined"
            ? 0
            : ++lastIndexes[keyName];
        newKeyValues[key].name = obj.name.replace(
          "[]",
          "[" + lastIndexes[keyName] + "]"
        );
      }
    });

    return newKeyValues;
  };

  Plugin.prototype.stringArrayKeyToVariable = function (stringVars, value) {
    var _this = this;

    var variable;
    if (stringVars.length > 0) {
      var stringVar = stringVars.shift().trim();
      variable = isNaN(stringVar) && stringVar != "" ? {} : [];
      variable[stringVar] =
        stringVars.length > 0
          ? _this.stringArrayKeyToVariable(stringVars, value)
          : value;
    }

    return variable;
  };

  $.fn[pluginName] = function (options) {
    return new Plugin(this, options).toJsonObject();
  };
})(jQuery, window, document);

var CorePrint = function() {
  var _btnFrmPrint = $('#btn-frm-print'),
    _FrmPrint = $('#frm-print')

  var html = async(printData) => {
    let link = document.createElement("link");
    link.href = jBaseURL + "/assets/fonts/sarabun/style.css?v=" + Math.random(); /**** your CSS file ****/
    link.rel = "stylesheet";
    link.type = "text/css";
    var xprint = $('<iframe>', {
        id: 'myiframe',
        name: 'myiframe',
        class: 'printFrame'
      })
      .appendTo('body')
      .contents();
    xprint.find('head').append(link);
    xprint.find('body').append(printData);
    let xf = window.frames['myiframe'];
    xf.src += xf.src;
    setTimeout(() => {
      xf.focus();
      xf.print();
    }, 1000);
    setTimeout(() => $(".printFrame").remove(), 1000);
  }

  return {
    init: (objFrmPrint) => {
      if (objFrmPrint !== undefined)
        _FrmPrint = objFrmPrint;
      //// print action
      _btnFrmPrint.click((e) => {
        if (CoreForm.validate(_FrmPrint))
          _FrmPrint.submit();
        e.preventDefault();
      });

      // print from 
      _FrmPrint.submit((e) => {
        let iprint = _FrmPrint.find('#print_list').val();

        let ret = CoreJs.print2db(iprint, _FrmPrint.serialize());
        console.log('print : ', ret);
        if (ret !== undefined)
          if (ret.print !== undefined) {
            if (typeof ret.data == 'object')
              html(ret.printdata);
            else
              html(ret.data);
          } else alert('Not Page Printer Found!');
        else alert('Error data!!');
        e.preventDefault();
      });
    },
    initForm: (objFrmPrint) => {
      if (objFrmPrint !== undefined)
        _FrmPrint = objFrmPrint;
      CoreForm.initForm(_FrmPrint);
      CoreJs.select2db('#print_list', 'print_list_db&module_id=' + $('#_module_id').val());
    },
    print: async(printData) => {
      await html(printData);
    },
    execel: (data, filename) => {
      if (filename == undefined || fileName == '')
        filename = 'data';
      if (data === undefined) {
        alert('ไม่พบข้อมูล download file!!!!');
        return;
      }
      var linkSource = 'data:application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;base64,' + data;
      var downloadLink = document.createElement("a");
      var fileName = filename + '.xlsx';
      downloadLink.href = linkSource;
      downloadLink.download = fileName;
      downloadLink.click();
    }

  }
}();