/**
 * @author Brent Marohnic
 */

/*
$("#jsonData").on('pageinit', function(){
	//site code
	$('#displayData').empty();
	$.ajax({ 
		url: 'xhr/data.json',
		type: 'GET',
		dataType: 'json',
		success: function(response){
			console.log(response);
			console.log(response.myRecs);
			console.log(response.myRecs[0]);
			console.log(response.myRecs[0]['owner'][0]);
			console.log(response.myRecs[0]['owner'][1]);
			
			for ( var i = 0, len = response.myRecs.length; i < len; i++ ) {
				var prefx = response.myRecs[i];
					
                    $( ' ' + 
					'<div class="vehicles">' +
					'<p>' + prefx.owner[0] + " " + prefx.owner[1] +
						'<br>' + prefx.make[0] + " " + prefx.make[1] + 
						'<br>' + prefx.model[0] + " " + prefx.model[1] + 
						'<br>' + prefx.mileage[0] + " " + prefx.mileage[1] +
						'<br>' + prefx.transmission[0] + " " + prefx.transmission[1] +
						'<br>' + prefx.condition[0] + " " + prefx.condition[1] +
						'<br>' + prefx.oilCB[0] + " " + prefx.oilCB[1] +
						'<br>' + prefx.tireRotationCB[0] + " " + prefx.tireRotationCB[1] +
						'<br>' + prefx.oilChange[0] + " " + prefx.oilChange[1] +
						'<br>' + prefx.airChange[0] + " " + prefx.airChange[1] +
						'<br>' + prefx.notes[0] + " " + prefx.notes[1] +
					'</p>' +
					'</div>'
					).appendTo('#displayData');
                }
		}
	});
	
});
*/
$('#jsonData').on('pageshow', function() {
	$('#displayData').empty();
	$.couch.db('asdproject').view('asdproject/customers', {
		success: function(response) {
		$.each(response.rows, function(index, owner) {
				
				$('<li id="newLi' + index + '""><a href="#">' + owner.value["owner"][0] + " " + owner.value["owner"][1] +'</a></li>'
					).appendTo('#displayData');
				
				$('<ul data-role="listview" id="nestedUl' + index + '" data-add-back-btn="true"><li>' + owner.value.id +
						'<br>' + owner.value.rev +
						'<br>' + owner.value["make"][0] + " " + owner.value["make"][1] + 
						'<br>' + owner.value["model"][0] + " " + owner.value["model"][1] +
						'<br>' + owner.value["mileage"][0] + " " + owner.value["mileage"][1] +
						'<br>' + owner.value["condition"][0] + " " + owner.value["condition"][1] +
						'<br>' + owner.value["transmission"][0] + " " + owner.value["transmission"][1] +
						'<br>' + owner.value["oilCB"][0] + " " + owner.value["oilCB"][1] +
						'<br>' + owner.value["tireRotationCB"][0] + " " + owner.value["tireRotationCB"][1] +
						'<br>' + owner.value["oilChange"][0] + " " + owner.value["oilChange"][1] +
						'<br>' + owner.value["airChange"][0] + " " + owner.value["airChange"][1] +
						'<br>' + owner.value["notes"][0] + " " + owner.value["notes"][1] + '</li></ul>'
					).appendTo('#newLi' + index);
				
				$('<li>' +
				'<input type="button" data-inline="true" id="edit' + index + '" data-id="' + owner.value.id + '" data-rev="' + owner.value.rev + '" value="Edit Entry"/>' +
				'<input type="button" data-inline="true" id="delete' + index + '" data-id="' + owner.value.id + '" data-rev="' + owner.value.rev + '" value="Delete Entry" />' +
				'</li>' ).appendTo('#nestedUl' + index);
				
				var entryId = owner.value.id,
				entryRev = owner.value.rev;
		
				$('input[id=delete' + index + ']').on('click', { id: entryId , rev: entryRev}, deleteEntry);
				$('input[id=edit' + index + ']').on('click', { id: entryId , rev: entryRev }, editEntry);
				
				
			});
			
			
			$('#displayData').listview('refresh');
		}
	});
	
});


/*
$("#jsonData").on('pageinit', function(){
	//site code
	$('#displayData').empty();
	$.ajax({ 
		url: '_view/customers',
		type: 'GET',
		dataType: 'json',
		success: function(response){
			
			$.each(response.rows, function(index, owner) {
				console.log(owner.value["owner"][0]);
				
				$( ' ' + 
					'<li><a href="#">' + owner.value["owner"][0] + " " + owner.value["owner"][1] + 
						'<br>' + owner.value["make"][0] + " " + owner.value["make"][1] + 
						'<br>' + owner.value["model"][0] + " " + owner.value["model"][1] +
						'<br>' + owner.value["mileage"][0] + " " + owner.value["mileage"][1] +
						'<br>' + owner.value["condition"][0] + " " + owner.value["condition"][1] +
						'<br>' + owner.value["transmission"][0] + " " + owner.value["transmission"][1] +
						'<br>' + owner.value["oilCB"][0] + " " + owner.value["oilCB"][1] +
						'<br>' + owner.value["tireRotationCB"][0] + " " + owner.value["tireRotationCB"][1] +
						'<br>' + owner.value["oilChange"][0] + " " + owner.value["oilChange"][1] +
						'<br>' + owner.value["airChange"][0] + " " + owner.value["airChange"][1] +
						'<br>' + owner.value["notes"][0] + " " + owner.value["notes"][1] + 
					'</a></li>'

					).appendTo('#displayData');
				
			});
			$('#displayData').listview('refresh');
		}
	});
	
});
*/

$("#xmlData").on('pageinit', function(){
	//site code
	$('#displayXMLData').empty();
	$.ajax({ 
		url: 'xhr/data.xml',
		type: 'GET',
		dataType: 'xml',
		success: function(xml){
			var xmlObj = $(xml);
			xmlObj.find("item").each(function(){
				var owner = $(this).find("owner").text(),
					make = $(this).find("make").text(),
					model = $(this).find("model").text(),
					mileage = $(this).find("mileage").text(),
					transmission = $(this).find("transmission").text(),
					condition = $(this).find("condition").text(),
					oilCB = $(this).find("oilCB").text(),
					tireRotationCB = $(this).find("tireRotationCB").text(),
					oilChange = $(this).find("oilChange").text(),
					airChange =$(this).find("airChange").text(),
					notes =  $(this).find("notes").text();
				
				$( ' ' + 
					'<div class="vehicles">' +
					'<p>Owner: ' + owner +
						'<br>Make: ' + make + 
						'<br>Model: ' + model + 
						'<br>Mileage: ' + mileage +
						'<br>Transmission: ' + transmission +
						'<br>Condition: ' + condition +
						'<br>Oil and Filter: ' + oilCB +
						'<br>Tire Rotation: ' + tireRotationCB +
						'<br>Last Oil Change: ' + oilChange +
						'<br>Last Air Filter Change: ' + airChange +
						'<br>Notes: ' + notes +
					'</p>' +
					'</div>'
					).appendTo('#displayXMLData');
			});
				
		}
	
	});
	
});


$("#wddxData").on('pageinit', function(){
	//site code
	$('#displayWDDXData').empty();
	$.ajax({ 
		url: 'xhr/data.wddx',
		type: 'GET',
		dataType: 'xml',
		success: function(wddx){
			var wddxObj = $(wddx);
			wddxObj.find("struct").each(function(){
				var owner = $(this).find("var[name='Owner: ']>string").text(),
					make = $(this).find("var[name='Make: ']>string").text(),
					model = $(this).find("var[name='Model: ']>string").text(),
					mileage = $(this).find("var[name='Mileage: ']>string").text(),
					transmission = $(this).find("var[name='Transmission: ']>string").text(),
					condition = $(this).find("var[name='Condition: ']>string").text(),
					oilCB = $(this).find("var[name='Oil and Filter: ']>string").text(),
					tireRotationCB = $(this).find("var[name='Tire Rotation: ']>string").text(),
					oilChange = $(this).find("var[name='Last Oil Change: ']>string").text(),
					airChange =$(this).find("var[name='Last Air Filter Change: ']>string").text(),
					notes =  $(this).find("var[name='Notes: ']>string").text();
				
				$( ' ' + 
					'<div class="vehicles">' +
					'<p>Owner: ' + owner +
						'<br>Make: ' + make + 
						'<br>Model: ' + model + 
						'<br>Mileage: ' + mileage +
						'<br>Transmission: ' + transmission +
						'<br>Condition: ' + condition +
						'<br>Oil and Filter: ' + oilCB +
						'<br>Tire Rotation: ' + tireRotationCB +
						'<br>Last Oil Change: ' + oilChange +
						'<br>Last Air Filter Change: ' + airChange +
						'<br>Notes: ' + notes +
					'</p>' +
					'</div>'
					).appendTo('#displayWDDXData');
			});
				
		}
	
	});
	
});



$('#home').on('pageinit', function(){
	//code needed for home page goes here
	
	
});	

// ----------------------------------- owners Page -----------------------------------
$('#owners').on('pageinit', function(){
		
			var	selectDiv = $("#ownersList");
			
			//Cycle thru the JSON data and create the listview
			for (var n in json) {
				
				$("<img></>").attr({
					src: 'images/' + json[n]["make"][1] + '.jpg',
					alt: json[n]["make"][1],
					height: 40,
					width: 40,
					value: json[n]["owner"][1]
				}).appendTo("#ownersList").wrapAll("<li>" + json[n]['owner'][1] + "</li>");
		
			}
			$('#ownersList').listview('refresh');
	
});	

// ----------------------------------- makes Page -----------------------------------
$('#makes').on('pageinit', function(){
		
			var	selectDiv = $("#makesList");
			
			//Cycle thru the JSON data and create the listview
			for (var n in json) {
				
				$("<img></>").attr({
					src: 'images/' + json[n]["make"][1] + '.jpg',
					alt: json[n]["make"][1],
					height: 40,
					width: 40,
					value: json[n]["make"][1]
				}).appendTo("#makesList").wrapAll("<li>" + json[n]['make'][1] + "</li>");
		
			}
			$('#makesList').listview('refresh');
	
});	

// ----------------------------------- models Page -----------------------------------
$('#models').on('pageinit', function(){
		
			var	selectDiv = $("#modelsList");
			
			//Cycle thru the JSON data and create the listview
			for (var n in json) {
				
				$("<img></>").attr({
					src: 'images/' + json[n]["make"][1] + '.jpg',
					alt: json[n]["make"][1],
					height: 40,
					width: 40,
					value: json[n]["model"][1]
				}).appendTo("#modelsList").wrapAll("<li>" + json[n]['model'][1] + "</li>");
		
			}
			$('#modelsList').listview('refresh');
	
});	

// ----------------------------------- addItem Page -----------------------------------
$('#addItem').on('pageshow', function(){
		
	var myForm = $('#bigForm');
	
	myForm.validate({
		
		invalidHandler: function(form, validator) {},
		
		submitHandler: function() {
		var data = myForm.serializeArray();
		logFormData(data);
		storeData(data);
		}
		
	})
	
	//any other code needed for addItem page goes here
	
	
	$("#clearLocal").on('click', clearLocal);
	$("#sessionBtn").on('click', showPage);
	
});

// ----------------------------------- session Page -----------------------------------

/*$('#sessionPage').on('pageinit', function(){

		if (localStorage.length === 0) {
			alert("There is no data to display. Default data was added.");
			autoPopulate();
		}
		
		$("#sessionList").empty();
		//Cycle thru the JSON data and create the listview
		
		for (var i=0, j=localStorage.length, k=i+1; i<j; i++, k++) {
			var key = localStorage.key(i),
				value = localStorage.getItem(key),
				obj = JSON.parse(value);
				
			$("<li>Item " + k + "</li>").attr({
				id: "mainLi" + key
			}).appendTo("#sessionList");
			
			$("<ul></ul>").attr({
				id: 'subUl' + key
			}).appendTo('#mainLi' + key);

			for (var n in obj) {
				
				$("<li>" + obj[n]["name"] +" "+ obj[n]["value"] + "</li>").appendTo("#subUl" + key);
				
			}
			$('<li>' +
				'<input type="button" data-inline="true" id="edit' + key + '" name="' + key + '"value="Edit Entry" />' +
				'<input type="button" data-inline="true" id="delete' + key + '" name="' + key + '" value="Delete Entry" />' +
			'</li>' ).appendTo('#subUl' + key);
	//		$('<li><a type="button" data-inline="true" href="#editEntry" id="edit' + key + '"value="Edit Entry">Edit Entry</a></li>' ).appendTo('#subUl' + key);
			
		}
	
	$("input[id^=delete]").on('click', deleteEntry);
	$("input[id^=edit]").on('click', editEntry);
	
});	
*/

//The functions below can go inside or outside the pageinit function for the page in which it is needed.
/*
var deleteEntry = function() {
	var ask = confirm("Are you sure you want to delete this vehicle?");
	if (ask){
		localStorage.removeItem(this.name);
		$("#sessionPage").trigger('pageinit');
		$.mobile.changePage($("#sessionPage"));
	}
	else {
		alert("The vehicle was not deleted.");
	}
};
*/

var deleteEntry = function(event) {
	var ask = confirm("Are you sure you want to delete " + event.data.id + " " + event.data.rev);
	if(ask){
		
		var doc = {
   		_id: event.data.id,
    	_rev: event.data.rev
		};
	
		$.couch.db("asdproject").removeDoc(doc, {
    		success: function(data) {
        	console.log(data);
    		},
    		error: function(status) {
        	console.log(status);
    		}
		});

		$("#jsonData").trigger('pageshow');
		$.mobile.changePage($("#jsonData"));
	}
	else {
		alert("The vehicle was not deleted.");
	}
};
/*
var editEntry = function() {
	var ask = confirm("Are you sure you want to edit this vehicle?");
	if (ask){
		
		var value = lStorage.getItem(this.name);
		var obj = JSON.parse(value);
		
		$("#editPage").trigger('pageinit');
		$.mobile.changePage($("#editPage"));
	}
	else {
		alert("The vehicle was not edited.");
	}
};
*/

var editEntry = function(event) {
	var ask = confirm("Are you sure you want to edit " + event.data.id + " " + event.data.rev);
	if(ask){
		
		$.couch.db("asdproject").openDoc(event.data.id, {
    		success: function(data) {
        	console.log(data);
        	console.log(data['owner'][1]);
        	$("#owner").attr('value' , data['owner'][1]);
        	$("#allMakes").attr('value' , data['make'][1]);
        	$("#allMakes").selectmenu('refresh');
        	$("#carModel").attr('value' , data['model'][1]);
        	
        	if (data['transmission'][1] === 'Automatic') {
        		$("#automatic").attr('checked' , 'checked');
        	}
        	else {
        		$("#manual").attr('checked' , 'checked');
        	};
        	
        	$("#carMileage").attr('value' , data['mileage'][1]);
        	$("#carCondition").attr('value' , data['condition'][1]);
        	
        	if (data['oilCB'][1] === 'checked') {
        		$("#oilAndFilter").attr('checked' , 'checked');
        	}
        	
        	if (data['tireRotationCB'][1] === 'checked') {
        		$("#tireRotation").attr('checked' , 'checked');
        	}
        	
        	$("#lastOilChange").attr('value' , data['oilChange'][1]);
        	$("#lastAirChange").attr('value' , data['airChange'][1]);
        	$("#comments").attr('value' , data['notes'][1]);
        	
    		},
    		error: function(status) {
        	console.log(status);
    		}
		});
		
		
		
		$("#addItem").trigger('showpage');
		$.mobile.changePage($("#addItem"));
	}
	else {
		alert("The vehicle was not edited.");
	}
};

var logFormData = function(data){
	// Write all form data to the console in order to view the objects
	
	console.log(data);
};


var autofillData = function (){
	 
};

var getData = function(){

};

/*
var storeData = function(data){
	var id = localStorage.length + 1;
	
		localStorage.setItem(id, JSON.stringify(data));
		alert("Vehicle Saved!");
}; 
*/

var storeData = function(data){
	var id = 'Customer:' + data[0]['value'];
	
	var ownerName = $('#owner').attr('name'),
		ownerValue = $('#owner').attr('value'),
		makeName = $('#allMakes').attr('name'),
		makeValue = $('#allMakes').attr('value'),
		modelName = $('#carModel').attr('name'),
		modelValue = $('#carModel').attr('value'),
		mileageName = $('#carMileage').attr('name'),
		mileageValue = $('#carMileage').attr('value'),
		transName = $('[name="Transmission:"]').attr('name'),
		transValue = $('[name="Transmission:"]').attr('value'),
		condName = $('#carCondition').attr('name'),
		condValue = $('#carCondition').attr('value'),
		oilName = $('#oilAndFilter').attr('name'),
		oilValue = $('#oilAndFilter').attr('checked'),
		tireName = $('#tireRotation').attr('name'),
		tireValue = $('#tireRotation').attr('checked'),
		oilDtName = $('#lastOilChange').attr('name'),
		oilDtValue = $('#lastOilChange').attr('value'),
		airDtName = $('#lastAirChange').attr('name'),
		airDtValue = $('#lastAirChange').attr('value'),
		notesName = $('#comments').attr('name'),
		notesValue = $('#comments').attr('value');
	
	if( oilValue === undefined ) {
		oilValue = null;
	};
	
	if( tireValue === undefined ) {
		tireValue = null;
	};
	
	alert( oilValue + tireValue );
	
	var doc = {
		"_id":id,
		"owner":[
			ownerName,
			ownerValue
		],
		"make":[
			makeName,
			makeValue
		],
		"model":[
			modelName,
			modelValue
		],
		"mileage":[
			mileageName,
			mileageValue
		],
		"transmission":[
			transName,
			transValue
		],
		"condition":[
			condName,
			condValue
		],
		"oilCB":[
			oilName,
			oilValue
		],
		"tireRotationCB":[
			tireName,
			tireValue
		],
		"oilChange":[
			oilDtName,
			oilDtValue
		],
		"airChange":[
			airDtName,
			airDtValue
		],
		"notes":[
			notesName,
			notesValue
		]
	};
	$.couch.db("asdproject").saveDoc(doc, {
    success: function(data) {
        console.log(data);
    },
    error: function(status) {
        console.log(status);
    }
});
};


var	deleteItem = function (){
			
};
					
var clearLocal = function(){
	
	localStorage.clear();
	alert("Local Storage Has Been Deleted!");
};

function autoPopulate(){
	// Populate display data with data retrieved from the JSON object whenever there is no data in local storage.
	for(var n in json) {
		var id = localStorage.length;
		localStorage.setItem(id, JSON.stringify(json[n]));
		
	}
	return false;
};

var showPage = function(){
	$("#sessionPage").trigger('pageinit');
	$.mobile.changePage($("#sessionPage"));
}



/*
var doc = {
		"_id":id,
		"owner":[
			data[0]['name'],
			data[0]['value']
		],
		"make":[
			data[1]['name'],
			data[1]['value']
		],
		"model":[
			data[2]['name'],
			data[2]['value']
		],
		"mileage":[
			data[3]['name'],
			data[3]['value']
		],
		"transmission":[
			data[4]['name'],
			data[4]['value']
		],
		"condition":[
			data[5]['name'],
			data[5]['value']
		],
		"oilCB":[
			oilName,
			oilValue
		],
		"tireRotationCB":[
			tireName,
			tireValue
		],
		"oilChange":[
			data[8]['name'],
			data[8]['value']
		],
		"airChange":[
			data[9]['name'],
			data[9]['value']
		],
		"notes":[
			data[10]['name'],
			data[10]['value']
		]
 */