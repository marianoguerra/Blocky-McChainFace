function createUUID(){
    var dt = new Date().getTime();
    var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = (dt + Math.random()*16)%16 | 0;
        dt = Math.floor(dt/16);
        return (c=='x' ? r :(r&0x3|0x8)).toString(16);
    });
    return uuid;
}

/**
 * Create Car Transaction
 * @param {org.logbook.car.CreateCar} carData
 * @transaction
 * 
 * 1. Check for the validity of the schedule - throw error 
 * 2. Create the Car asset
 *    2.1 Set the carId
 *    2.2 Set the brand
 * 3. Emit CarCreated Event
 * 4. Add the car asset to the registry
 */

function    createCar(carData) {

    /**
     * 1. Validate the schedule data
     * If the date is a past date then throw an error
     */
    var timeNow = new Date().getTime();
    var  NS =  'org.logbook.car';

    // Get the Asset Registry

    return getAssetRegistry('org.logbook.car.Car')
    
        .then(function(carRegistry){
            // Now add the Car - global function getFactory() called
            var  factory = getFactory();

            // Solution to exercise - Removed hardcoded value & invoked
            // generate the flight ID
            // 2.1 Set the flightNumber, flightId ... 
            var  carId = createUUID();
            var  car = factory.newResource(NS, 'Car', carId);
	    car.name= carData.name;
	    car.brand= carData.brand;
	    car.model= carData.model;
	    car.year= carData.year;
	    car.color= carData.color;
	    car.createdDate = timeNow;

            // 3 Emit the event CarCreated
            var event = factory.newEvent(NS, 'CarCreated');
            event.id = carId;
            event.name = car.name;
            event.brand = car.brand;
            event.model = car.model;
            event.year = car.year;
            event.color = car.color;
            event.owner = car.owner;
            event.createdDate = car.createdDate;
            emit(event);

            // 4. Add to registry
            return carRegistry.add(car);
        });
}

/**
 * Transfer Car Transaction
 * @param {org.logbook.car.TransferCar} transferData
 * @transaction
 * 
 * 1. Check for the validity of the schedule - throw error 
 * 2. Create the Order asset
 *    2.1 Set the orderId
 *    2.2 Set the newOwner
 * 3. Emit OrderCreated Event
 * 4. Add the order asset to the registry
 */
function TransferCar(transferData) {

    /**
     * 1. Validate the schedule data
     * If the date is a past date then throw an error
     */
    var timeNow = new Date().getTime();
    var carRegistry = {};
    var updatedCar = {};
    var  NS =  'org.logbook.car';


    // Get the Asset Registry
    return getAssetRegistry('org.logbook.car.Car')
        .then(function(registry) {
            carRegistry = registry;
	    return carRegistry.get(transferData.car);
	}).then(function (car) {
	    if(!car) throw new Error("Car : " + transferData.car, " Not Found!!!");

	    car.owner = transferData.newOwner;
	    updatedCar = car;
	    return carRegistry.update(car);
	}).then(function(){
            // 3 Emit the event CarTransfered
	    var factory = getFactory();
            var event = factory.newEvent(NS, 'CarTransfered');
            event.id = updatedCar.id;
            event.name = updatedCar.name;
            event.brand = updatedCar.brand;
            event.model = updatedCar.model;
            event.year = updatedCar.year;
            event.color = updatedCar.color;
            event.owner = updatedCar.owner;
            event.createdDate = updatedCar.createdDate;

            emit(event);
        }).catch(function(error){
            throw new Error(error);
	});
}

function ScheduleService(orderData) {

    /**
     * 1. Validate the schedule data
     * If the date is a past date then throw an error
     */
    var timeNow = new Date().getTime();
    var carRegistry = {};
    var orderRegistry = {};
    var serviceRegistry = {};
    var  NS =  'org.logbook.car';

    // Get the Asset Registry
    return 
	getAssetRegistry('org.logbook.car.Order')
	.then(function(registry) {
            orderRegistry = registry;
	    return registry;
	}).then(function(registry) {
	    return getParticipantRegistry('org.logbook.participant.Services')
	}).then(function(registry) {
            serviceRegistry = registry;
	    return getAssetRegistry('org.logbook.car.Car')
	}).then(function(registry) {
            carRegistry = registry;
	    return carRegistry.get(transferData.car);
	}).then(function (car) {
	    if(!car) throw new Error("Car : " + transferData.car, " Not Found!!!");

	    var factory = getFactory();

	    var  orderId = createUUID();
            var  order = factory.newResource(NS, 'Order', orderId);

	    var carRelationship = factory.newRelationship(NS, 'Car', car.id);
	    order.car = carRelationship;

	    order.date = timeNow;
	    order.type = orderData.type;
	    order.summary = orderData.summary;


	    var serviceRelationship = factory.newRelationship(org.logbook.participant, 'Service', orderData.serviceProvider);
	    order.serviceProvider = serviceRelationship;

            // 3 Emit the event CarTransfered
            var event = factory.newEvent(NS, 'OrderCreated');
            event.id = orderId;
            event.car = car;
            event.date = order.date;
            event.type = order.type;
            event.summary = order.summary;
            event.serviceProvider = orderData.serviceProvider;

            emit(event);
        }).catch(function(error){
            throw new Error(error);
	});
}
