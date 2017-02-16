//
// line-viewer
//
// A flag to track whether plotly viewer is
// being used inside another window (i.e. Chaise), set enableEmbedded.

var enableEmbedded = false;
if (window.self !== window.top) {
  var $iframe_parent_div = window.frameElement ? $(window.frameElement.parentNode) : null;
  if (!$iframe_parent_div || !$iframe_parent_div.is(':visible')) enableEmbedded = true;
}

var trackingPlot=[];

function moreThanOnePlot(){
//window.console.log("trackingPlot..", trackingPlot.length);
  if(trackingPlot.length > 1)
    return true;
  return false;
}


function isEmpty(obj) {
  for (var x in obj) {
    if (obj.hasOwnProperty(x))
      return false;
  }
  return true;
}


function getPlotVisName(plot_idx) {
  var _visible_name=plot_idx+"_plot_visible";
  return _visible_name;
}

function getPlotEyeName(plot_idx) {
  var _visible_name=plot_idx+"_plot_eye_name";
  return _visible_name;
}

function setupPlotList(cnt) {
// default to first one
  trackingPlot.push(true);
  for(var i=1;i<cnt;i++) {
    trackingPlot.push(false);
  }
}

function togglePlot(plot_idx, pname) {
  var tmp='#'+pname;
  var eptr = $(tmp);
  if( eptr.hasClass('glyphicon-eye-open')) {
    eptr.removeClass('glyphicon-eye-open').addClass('glyphicon-eye-close');
    trackingPlot[plot_idx]= false;
    } else {
      eptr.removeClass('glyphicon-eye-close').addClass('glyphicon-eye-open');
      trackingPlot[plot_idx]= true;
  }
}

// only click to enable, 
// togglePlot(1,'1_plot_eye_name')
// 1_plot_visible
function toggleToPlot(plot_idx, pname) {
  if(trackingPlot[plot_idx]== true) {
   // do nothting
    return;
  }
  var cnt=trackingPlot.length;
  for(var i=0;i<cnt;i++) {
    if(trackingPlot[i]== true) {
      togglePlot(i, getPlotEyeName(i));
      togglePlot(plot_idx,pname);
      refreshPlot(plot_idx);
      return;
    }
  }
}

function enablePlot(plot_idx) {
}

// fill in the top level of plotList
function add2PlotList(titlelist) {
  for(var i=0; i<titlelist.length;i++) {
    var pname=titlelist[i];
    addOnePlot(i, pname);
  }
  togglePlot(0, getPlotEyeName(0));
}

// given a plot, expand the html structure
function addOnePlot(plot_idx, pname) {
  var name = pname.replace(/ +/g, "");
  var _n=name;
  var _visible_name=plot_idx+"_plot_visible";
  var _collapse_name=plot_idx+"_plot_collapse";
  var _eye_name=plot_idx+"_plot_eye_name";
  var _body_name=plot_idx+"_plot_body";

   var _nn='';
  _nn+='<div class="panel panel-default col-md-12">';
  _nn+='<div class="panel-heading">';
  _nn+='<div class="panel-title row" style="background-color:transparent;">'; 

if(moreThanOnePlot()) {
//window.console.log("more than one data..");
  _nn+='<button id="'+_visible_name+'" class="pull-left"  style="display:inline-block;outline: none;border:none; background-color:white"  onClick="toggleToPlot('+plot_idx+',\''+_eye_name+'\')" title="hide or show plot"><span id="'+_eye_name+'" class="glyphicon glyphicon-eye-close" style="color:#337ab7;"></span> </button>';
}

  _nn+='<text>'+pname+'</text>';
  _nn+='</div> <!-- panel-title -->'; 
  _nn+='</div> <!-- panel-heading-->';
  _nn+='<div id="'+_collapse_name+'" class="panel-collapse collapse">';
  _nn+='<div id="'+_body_name+'" class="panel-body">';
  _nn+='</div> <!-- panel-body -->';
  _nn+='</div>';
  // last bits
  _nn+='</div> <!-- panel -->';
  jQuery('#plotList').append(_nn);
//  window.console.log(_nn);
  return _visible_name;
}


