$(document).ready(function() {
	$('.more > .fa').click(function() {
		$('.double-sided-card__back').addClass('double-sided-card_active-side');
		$('.double-sided-card__front').removeClass('double-sided-card_active-side');
	})
	
	$('.go-back > .fa').click(function() {
		$('.double-sided-card__front').addClass('double-sided-card_active-side');
		$('.double-sided-card__back').removeClass('double-sided-card_active-side');
	})
})