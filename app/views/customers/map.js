function (doc) {
  if(doc._id.substr(0,9) === "Customer:") {
    emit(doc._id, {
    	"owner":doc.owner,
    	"make":doc.make,
    	"model":doc.model,
		"mileage":doc.mileage,
    	"transmission":doc.transmission,
    	"condition":doc.condition,
    	"oilCB":doc.oilCB,
    	"tireRotationCB":doc.tireRotationCB,
    	"oilChange":doc.oilChange,
    	"airChange":doc.airChange,
    	"notes":doc.notes

    	}
    );
  }
};