// Your web app's Firebase configuration
var Config = {
    apiKey: "AIzaSyDhoW5OTU0G23nP_nqUb4-PAxPS2_p6BOU",
    authDomain: "oct-19-test-project.firebaseapp.com",
    databaseURL: "https://oct-19-test-project.firebaseio.com",
    projectId: "oct-19-test-project",
    storageBucket: "oct-19-test-project.appspot.com",
    messagingSenderId: "208957693909",
    appId: "1:208957693909:web:abc9e402abf2411620675c"
  };
  // Initialize Firebase
  firebase.initializeApp(Config);
  var database = firebase.database();

  $(".add").on("click", function(){
    trainName = $("#train-name").val().trim();
    trainDestination = $("#train-destination").val().trim();
    firstTrain = $("#first-train").val().trim();
    frequency = $("#train-frequency").val().trim();
    
    database.ref().push({
        trainName: trainName,
        trainDestination: trainDestination,
        firstTrain: firstTrain,
        frequency: frequency
    });
    $("#train-name").val("");
    $("#train-destination").val("");
    $("#first-train").val("");
    $("#train-frequency").val("");

  });

  database.ref().on("child_added", function(snapshot){
    train_info = snapshot.val();

    var trainNameDisp = train_info.trainName;
    var trainDestinationDisp = train_info.trainDestination;
    var firstTrainDisp = train_info.firstTrain;
    var frequencyDisp = train_info.frequency;
    
    var firstTrainMoment = moment(firstTrainDisp, "HH:mm").subtract(1,"days");

    var timeDiff = moment().diff(moment(firstTrainMoment), "minutes");
    var timeRemainder = timeDiff % frequencyDisp;

    var minsNextTrain = frequencyDisp - timeRemainder;
    var nextTrain = moment().add(minsNextTrain, "minutes");

    var trainNameTable = $("<td>").text(trainNameDisp);
    var trainDestinationTable = $("<td>").text(trainDestinationDisp);
    var frequencyTable = $("<td>").text(frequencyDisp);
    var nextTrainTable = $("<td>").text(moment(nextTrain).format("hh:mm"));
    var minsNextTrainTable = $("<td>").text(minsNextTrain)
    
    var tableRow = $("<tr>");
    
    tableRow.append(trainNameTable , trainDestinationTable, frequencyTable, nextTrainTable, minsNextTrainTable);
    $(".train-schedule").prepend(tableRow);
  });