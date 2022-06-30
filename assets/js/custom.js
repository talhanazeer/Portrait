$(document).ready(function() {
    //datepicker custom js Start
    if ($('.fromDate').length > 0) {
        $('.toDate, .fromDate').datepicker({
            dateFormat: 'dd-mm-yy',
            minDate: +1,
            dayNamesMin: ["S", "M", "T", "W", "T", "F", "S"]
        });
        $('.toDate, .fromDate').datepicker('option', {
            beforeShow: customRange
        });
    }
    //datepicker js End
    function customRange(input) {
        if ($(input).hasClass('toDate')) {
            return {
                minDate: $(input).parents('form').find('.fromDate').datepicker("getDate")
            };
        } else if ($(input).hasClass('fromDate')) {
            return {
                maxDate: $(input).parents('form').find('.toDate').datepicker("getDate")
            };
        }
    }
    var multicitycount;
    multicitycount = $("input.origin").length;
    $(".search-engine").on("keyup change", ".form-control", function() {
        var counter = $(".search-engine").find('input:not(.passenger-dropdown input,.PassengersField, .enq_type)').filter(function(e) {
            return !!this.value;
        }).length;
        if (counter > 0) {
            $(".form-hiden-portion").show("slow");
        } else {
            $(".form-hiden-portion").hide("slow");
        }
    });
    //count passenger js Strat 

    if ($(".Passengers").hasClass("auto-filled-values")) {
        countPassenger($(this).find('.minus').parents("form"));
    }

    if ($('.Passengers').length > 0) {
        $('.passengers').each(function(index, el) {
            countPassenger($(this).find('.minus').parents("form"));
        });
    }

    $('.plus').click(function() {

        var Adult = $(this).parents('form').find('.totalAdult').val();
        var Child = $(this).parents('form').find('.totalChild').val();
        var Infant = $(this).parents('form').find('.totalInfant').val();
        var mainPhone = $('.navbar-nav').find('.nav-item.phone a').text();

        if (parseInt(Adult) + parseInt(Child) + parseInt(Infant) < 9) {
            if ($(this).siblings('input.passengerInput').hasClass('totalAdult')) {
                addPassenger($(this));
            } else if ($(this).siblings('input.passengerInput').hasClass('totalChild')) {
                if (Child < Adult * 2) {
                    addPassenger($(this));
                } else {
                    alert('Maximum number of child should be double number of adults!');
                }
            } else if ($(this).siblings('input.passengerInput').hasClass('totalInfant')) {
                if (Infant < Adult) {
                    addPassenger($(this));
                } else {
                    alert('Number of infants should be equal to or less then number of adults!');
                }
            }
        } else {
            alert('Total no of person should not be more than 9!\n Call us on ' + mainPhone.trim() + ' for bulk bookings.');
        }
    });

    $('.minus').click(function() {
        var Adult = $(this).parents('form').find('.totalAdult').val();
        var Child = $(this).parents('form').find('.totalChild').val();
        var Infant = $(this).parents('form').find('.totalInfant').val();

        if ($(this).siblings('input.passengerInput').hasClass('totalAdult')) {
            if (Adult * 2 <= Child || Adult * 2 - 1 <= Child) {
                alert('Kindly decrease the number of Children first!');
            } else if (Adult <= Infant) {
                alert('Kindly decrease the number of Infant first!');
            } else {
                minusPassenger($(this));
            }
        } else if ($(this).siblings('input.passengerInput').hasClass('totalChild') || $(this).siblings('input.passengerInput').hasClass('totalInfant')) {
            minusPassenger($(this));
        }
    });
    //count passenger js End


    



    if ($('.form').length > 0) {
        $('.form').each(function(index, el) {
            var formID = 'form-' + $.now();
            $(this).attr('id', formID);
            $('#' + formID).validate({
                highlight: function(element) {
                    $(element).addClass("error-item");
                },
                unhighlight: function(element) {
                    $(element).removeClass("error-item");
                }
            });
        });
    }



    $('.form').each(function(index, el) {
        var formID = 'form-' + $.now();
        $(this).attr('id', formID);
        $('#' + formID).validate({
            highlight: function(element) {
                $(element).addClass("error-item");
            },
            unhighlight: function(element) {
                $(element).removeClass("error-item");
            }
        });
    });


    //autocomplete js Start

    if ($("#AirLine").length > 0) {
        $("input#AirLine").autocomplete({
            autoFocus: true,
            minLength: 2,
            source: '/autocomplete.php?handler=getairlineList',
            select: function(event, ui) {
                $("input#AirLine").val((ui.item.label));
                $("input#AirLineInput").val(ui.item.url)
            },

            change: function(event, ui) {
                if (ui.item) {
                    $("input#AirLine").val((ui.item ? ui.item.label : ""));
                    $("input#AirLineInput").val((ui.item ? ui.item.url : ""))
                } else {
                    $("input#AirLine").val("");
                    $("input#AirLineInput").val("")
                }
            },
            search: function(event, ui) {
                console.log(ui.item);
                $("input#AirLine").parents("div.form-group").addClass("load")
            },
            response: function() {
                $("input#AirLine").parents("div.form-group").removeClass("load")
            }
        })
    }

    if ($("#originAirport").length > 0) {
        $("input#originAirport").autocomplete({
            autoFocus: true,
            minLength: 3,
            source: '/autocomplete.php?handler=getairportList',
            select: function(event, ui) {

                $("input#originAirport").val((ui.item.label));
                $("input#originAir").val(ui.item.id)
            },
            change: function(event, ui) {

                if (ui.item) {
                    $("input#originAirport").val((ui.item ? ui.item.label : ""));
                    $("input#originAir").val((ui.item ? ui.item.id : ""))
                } else {
                    $("input#originAirport").val("");
                    $("input#originAir").val("")
                }
            },
            search: function(event, ui) { $("input#originAirport").parents("div.airport-search").addClass("load") },
            response: function() {
                $("input#originAirport").parents("div.airport-search").removeClass("load")
            }
        })
    }

    if ($("#destinationAirport").length > 0) {
        $("input#destinationAirport").autocomplete({
            autoFocus: true,
            minLength: 3,
            source: '/autocomplete.php?handler=getairportList',
            select: function(event, ui) {
                $("input#destinationAirport").val((ui.item.label));
                $("input#destinationAir").val(ui.item.id)
            },

            change: function(event, ui) {
                if (ui.item) {
                    $("input#destinationAirport").val((ui.item ? ui.item.label : ""));
                    $("input#destinationAir").val((ui.item ? ui.item.id : ""))
                } else {
                    $("input#destinationAirport").val("");
                    $("input#destinationAir").val("")
                }
            },
            search: function(event, ui) { $("input#destinationAirport").parents("div.airport-search").addClass("load") },
            response: function() {
                $("input#destinationAirport").parents("div.airport-search").removeClass("load")
            }
        })
    }

    if ($("#SearchDestinationAirport").length > 0) {
        $("input#SearchDestinationAirport").autocomplete({
            autoFocus: true,
            minLength: 3,
            source: '/autocomplete.php?handler=airportList_WO_UK',
            select: function(event, ui) {
                $("input#SearchDestinationAirport").val((ui.item.label));
                $("input#SearchDestinationAir").val(ui.item.id)
            },

            change: function(event, ui) {
                if (ui.item) {
                    $("input#SearchDestinationAirport").val((ui.item ? ui.item.label : ""));
                    $("input#SearchDestinationAir").val((ui.item ? ui.item.id : ""))
                } else {
                    $("input#SearchDestinationAirport").val("");
                    $("input#SearchDestinationAir").val("")
                }
            },
            search: function(event, ui) { $("input#SearchDestinationAirport").parents("div.airport-search").addClass("load") },
            response: function() {
                $("input#SearchDestinationAirport").parents("div.airport-search").removeClass("load")
            }
        })
    }
    //autocomplete js End

    if ($('input.multicitydeparture').length > 0) {
        id = ($('input.multicitydeparture').attr("id"));
    }


    //multicityArrival

});

$(document).click(function(e) {
    var container = $(".passenger-dropdown");
    // if the target of the click isn't the container nor a descendant of the container
    if (!container.is(e.target) && container.has(e.target).length === 0) {
        container.collapse('hide');
    }
});



function countPassenger(value) {
    adultCount = $(value).find("input.totalAdult").val();
    childCount = $(value).find("input.totalChild").val();
    infantCount = $(value).find("input.totalInfant").val();
    $(value).find('.inputValue').val('0' + adultCount + ' Adt - 0' + childCount + ' Chd - 0' + infantCount + ' Inf');
}

function addPassenger(value) {
    if (value.parents('.passenger').find('.passengerInput').val() < 10) {
        value.parents('.passenger').find('.passengerInput').val(+value.parents('.passenger').find('.passengerInput').val() + 1);
    }
    countPassenger(value.parents("form"));
}

function minusPassenger(value) {
    if (value.parents('.passenger').find('.passengerInput').val() > (value.parents('.passenger').find('.passengerInput').hasClass('totalAdult') ? 1 : 0)) {
        value.parents('.passenger').find('.passengerInput').val(+value.parents('.passenger').find('.passengerInput').val() - 1);
    }
    countPassenger(value.parents("form"));
}



$(document).ready(function() {
    $("input").focus(function() {
        $(this).parent(".form-input-box").css("border", "2px solid red");
    });
    $("input").blur(function() {
        $(this).parent(".form-input-box").css("border", "2px solid #e9e9e9");
    });
});
$(document).ready(function() {
    $("input").focus(function() {
        $(this).parent(".input-group").parent(".input-group-main").css("border", "2px solid red");
    });
    $("input").blur(function() {
        $(this).parent(".input-group").parent(".input-group-main").css("border", "2px solid #bfbfbf");
    });
});