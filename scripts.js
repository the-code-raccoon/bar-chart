
function getyMax(data, options) {
  let max = ('yMax' in options && options.yMax !== null) ?
    options.yMax :
    Math.max(...data);

  return max;
}

function drawXLabels(dataPoints, element, options) {
  if (dataPoints[0].value === dataPoints[0].label) return;

  $(`#${element}`).append(`<div class='x-labels-container'></div>`);

  dataPoints.forEach((point, index)=> {
    $(`#${element} .x-labels-container`).append(`<div class='x-label'>${point.label}</div>`);
    $(`#${element} .x-label:last-child`).css('width', `${400 / dataPoints.length}px`);

    // CHECKS IF OVERFLOWING
    // console.log(point.label, $(`#${element} .x-label:last-child`).prop('scrollWidth'), $(`#${element} .x-label:last-child`).prop('clientWidth'));
    // if ($(`#${element} .x-label`).prop('scrollWidth') > $(`#${element} .x-label`).width()) {
      // console.log(point.label);
    // }
  });

  $(`#${element} .x-label`).css('overflow', `auto`);

  ('barSpacing' in options && options.barSpacing !== null) ?
    $(`#${element} .x-label`).css('margin-left', `${options.barSpacing}px`) :
    $(`#${element} .x-label`).css('margin-left', `10px`);


}

function setBarColor(options, element) {
  ('barColor' in options && options.barColor !== null) ?
    $(`#${element} .bar`).css('background-color', `#${options.barColor}`) :
    $(`#${element} .bar`).css('background-color', `#C297B8`);
}

function setBarLabelPosition(options, element) {
  if ('barLabelPosition' in options && options.barLabelPosition !== null) {
    if (options.barLabelPosition === 'center') {
      $(`#${element} .bar-label`).css('top', `calc(50% - 0.5em)`);
    } else if (options.barLabelPosition === 'bottom') {
      $(`#${element} .bar-label`).css('top', `calc(100% - 1.5em)`);
    } else { // options.barLabelPosition === 'top'
      $(`#${element} .bar-label`).css('top', '0.5em');
    }
  } else {

    $(`#${element} .bar-label`).css('top', '0.5em');
  }
}

function setBarLabelColor(options, element) {
  ('barLabelColor' in options && options.barLabelColor !== null) ?
    $(`#${element} .bar-label`).css('color', `#${options.barLabelColor}`) :
    $(`#${element} .bar-label`).css('color', `#000000`);
}

function setBarSpacing(options, element) {
  if ('barSpacing' in options && options.barSpacing !== null) {
    $(`#${element} .bar`).css('margin-left', `${options.barSpacing}px`);
    $(`#${element} .bar`).last().css('margin-right', `${options.barSpacing}px`);
  } else {
    $(`#${element} .bar`).css('margin-left', `10px`);
    $(`#${element} .bar`).last().css('margin-right', '10px');
  }
}

function setAxesNames(options, element) {
  if ('yAxisName' in options && options.yAxisName !== null) {
    $(`#${element}`).append(`<div class='y-axis-label'><p>${options.yAxisName}</p></div>`);
  }
  if ('xAxisName' in options && options.xAxisName !== null) {
    $(`#${element}`).append(`<div class='x-axis-label'><p>${options.xAxisName}</p></div>`);
  }
}

function setTitleFontSize(options, element) {
  if ('titleFontSize' in options && options.titleFontSize !== null) {
    $(`#${element} .title > h1`).css('font-size', options.titleFontSize);
  }
}

function setTitleFontColor(options, element) {
  if ('titleFontColor' in options && options.titleFontColor !== null) {
    $(`#${element} .title > h1`).css('color', `#${options.titleFontColor}`);
  }
}

function setTitle(options, element) {
  if ('title' in options && options.title !== null) {
    $(`#${element}`).append(`<div class='title'><h1>${options.title}</h1></div>`);
  } else if (options.title === null) {
    $(`#${element}`).append(`<div class='title'><h1>Title</h1></div>`);
  } else {
    $(`#${element}`).append(`<div class='title'></div>`);
  }
  setTitleFontSize(options, element);
  setTitleFontColor(options, element);
}

function drawMarkers(options, max, element) {
  $(`#${element}`).append(`<div class='markers-container'></div>`);
  for (let i = 4; i >= 0; i--) {
    $(`#${element} .markers-container`).append(`<div class='marker'>${(max * (i / 4)).toFixed(2)}</div>`);
    $(`#${element} .marker:last-child`).css('margin-right', '0.5em');

  }
}

function drawBarChart(data, options, element) {

  let dataPoints = [];

  // SETS Y AXIS MAX VALUE
  let max = getyMax(data, options);

  element.append("<div class='graph-container'></div>");

  element = element.attr('id');

  // DRAWS ACTUAL BARS
  data.forEach((dataPoint, index) => {
    // ASSOCIATES X LABEL WITH DATAPOINT
    ('xLabels' in options && options.xLabels !== null) ?
      dataPoints.push({ 'label': options.xLabels[index], 'value': dataPoint }) :
      dataPoints.push({ 'label': dataPoint, 'value': dataPoint });

    $(`#${element} > .graph-container`).append($(`<div><span class="bar-label">${dataPoints[index].value}</span></div>`)
      .addClass('bar')
      .css('height', `calc(600px * (${dataPoint} / ${max}))`));
  });

  // SETS WIDTH OF BAR
  $(`#${element} .bar`).css('width', `calc(400px / ${data.length})`);

  // DRAWS X LABELS
  drawXLabels(dataPoints, element, options);

  // SETS COLOUR OF BAR
  setBarColor(options, element);

  // SETS BAR VALUE LABEL POSITION
  setBarLabelPosition(options, element);

  // SETS BAR VALUE LABEL COLOUR
  setBarLabelColor(options, element);

  // SETS BAR SPACING
  setBarSpacing(options, element);

  // SET BAR CHART AXES NAMES
  setAxesNames(options, element);

  // SETS CHART TITLE + FONT SIZE + FONT COLOUR
  setTitle(options, element);

  // SETS Y AXIS MARKERS
  drawMarkers(options, max, element);
}

drawBarChart([16, 2, 1.85, 4, 7, 1, 16], {
  'yMax': null,
  'xLabels': ['a', 'b', 'c', 'd', 'e', 'fgfdsgfyrytr', 'gfdsafdsafd'],
  'barColor': 'DE89BE',
  'barLabelPosition': 'center',
  'barSpacing': 20,
  'barLabelColor': '40434E',
  'xAxisName': 'X axis',
  'yAxisName': 'Y axis humina humina aaaeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee',
  'title': 'Fuck this graph',
  'titleFontSize': '30px',
  'titleFontColor': null, //344055
}, $('#container1'));

drawBarChart([1, 2, 0.5, 4, 7], {
  'yMax': null,
  'xLabels': ['a', 'b', 'c', 'd', 'e'],
  'barColor': '266DD3',
  'barLabelPosition': 'center',
  'barSpacing': 10,
  'barLabelColor': '40434E',
  'xAxisName': 'X axis',
  'yAxisName': 'Y axis humina humina',
  'title': 'Fuck this graph2',
  'titleFontSize': '30px',
  'titleFontColor': null, //344055
}, $('#container2'));
