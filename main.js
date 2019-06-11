/*
 #######################################################################
 #
 #  FUNCTION NAME : 
 #  AUTHOR        : 
 #  DATE          : 
 #  MODIFIED BY   : 
 #  REVISION DATE : 
 #  REVISION #    : 
 #  DESCRIPTION   : 
 #  PARAMETERS    : 
 #
 #######################################################################
*/

$(document).ready(function() {

	$("#alertModal").modal()

	$('.tooltipped').tooltip();

	$(".fa-arrow-circle-left").on("click",function() {

		let val = $(this).next().val()
			
		if (val <= 0) {
			val = 1
		} else if (val != 1)
			val--

		$(this).next().val(val)

	})

	$(".fa-arrow-circle-right").on("click",function() {

		let val = $(this).prev().val()
		val++
		$(this).prev().val(val)
		
	})

	$("a").on("click",function() {

		let isOK = checkInputs()

		if (isOK)
			calculateTips()

	})


})

/*
 #######################################################################
 #
 #  FUNCTION NAME : checkInputs
 #  AUTHOR        : Maricel Louise Sumulong
 #  DATE          : June 11, 2019 PDT
 #  MODIFIED BY   : 
 #  REVISION DATE : 
 #  REVISION #    : 
 #  DESCRIPTION   : 
 #  PARAMETERS    : none
 #
 #######################################################################
*/

let checkInputs = () => {

	$(".invalid").removeClass("invalid") //removes previously filled inputs

	let bill = $("#price_input").val()
	let tip = $("#tip_input").val()
	let num = $("#num_people").val()
	let inv = 0

	if (bill == "") {
		$("#price_input").addClass("invalid")
		inv++
	}

	if (tip == "" || Math.sign(parseInt(tip)) == -1) {
		$("#tip_input").addClass("invalid")
		inv++
	} 

	if (num == "" || Math.sign(parseInt(num)) != 1) {
		$("#num_people").addClass("invalid")
		inv++
	}

	if (inv) {
		alertMsg("Please provide correct input for the red-filled fields")
		return 0
	} else {
		return 1
	  }
	
}

/*
 #######################################################################
 #
 #  FUNCTION NAME : alertMsg
 #  AUTHOR        : Maricel Louise Sumulong
 #  DATE          : June 11, 2019 PDT
 #  MODIFIED BY   : 
 #  REVISION DATE : 
 #  REVISION #    : 
 #  DESCRIPTION   : alerts error message
 #  PARAMETERS    : message
 #
 #######################################################################
*/

let alertMsg = (msg) => {

  $("#alertModal .modal-body").empty().append(msg)
  $("#alertModal").modal("open")

}

/*
 #######################################################################
 #
 #  FUNCTION NAME : calculateTips
 #  AUTHOR        : Maricel Louise Sumulong
 #  DATE          : June 11, 2019 PDT
 #  MODIFIED BY   : 
 #  REVISION DATE : 
 #  REVISION #    : 
 #  DESCRIPTION   : calculate the tips
 #  PARAMETERS    : none
 #
 #######################################################################
*/

let calculateTips = () => {

	let bill = $("#price_input").val()
	let tip = $("#tip_input").val()
	let rtip = parseFloat(bill) * parseFloat(tip/100)
	rtip = rtip.toFixed(2)
	let num = $("#num_people").val()
	let tip_per_person 

	let new_price = parseFloat(bill) + rtip

	if (num > 1) {

		tip_per_person = parseFloat(rtip) / parseInt(num)
		tip_per_person = tip_per_person.toFixed(2)

	} else {

		tip_per_person = rtip
	
	  }

	$("#tip_per_person").empty().val(tip_per_person)
	$("#total_tip").empty().val(rtip)

}