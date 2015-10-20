(function()
{
	'use strict'

  HTMLInputElement.prototype.stepUp = function()
  {
    var step = +this.step || 1
    var value = +this.value + step

    if (this.max && value > +this.max) 
    {
      this.value = +this.value
      return
    }
    if (Math.round(step) !== step)
      var l = (this.step).split('.')[1].length

    var remainder = Math.abs(value % step)
    if (l) remainder = +remainder.toPrecision(l)

    if (remainder)
    {
      if (value >= 0) value -= remainder
      else
      {
        var dif = Math.abs(step) - Math.abs(remainder)
        value -= dif
      }
    }

    this.value = value
  }

  HTMLInputElement.prototype.stepDown = function()
  {
    var step = +this.step || 1
    var value = +this.value - step

    if (this.min && value < +this.min)
    {
      this.value = +this.value
      return
    }

    if (Math.round(step) !== step)
      var l = (this.step).split('.')[1].length

    var remainder = Math.abs(value % step)
    if (l) remainder = +remainder.toPrecision(l)

    if (remainder)
    {
      if (value >= 0)
      {
        var dif = Math.abs(step) - Math.abs(remainder)
        value += dif
      }
      else value += remainder
    }

    this.value = value
  }



	window.i = document.query('input')

	module.exports = function($input, settings)
	{
		var settings = Object.assign(
        {
            namespace: 'hc',
            control: 'inputnumber',
            separator: '-',
        }, settings || { })

        var CLASSES =
        [
            , 'increment'
            , 'decrement'
            , 'input'
            , 'label'
        ]
        .reduce(function(object, name)
        {
            object[name.toUpperCase()] = makeName(name)

            return object
        },  { })

        function makeName(name)
        {
            return Array,
            [
                , settings.namespace
                , settings.control
                , name
            ]
            .filter(String)
            .join(settings.separator)
        }

        function create(tag, name) 
        {
            var $element = document.createElement(tag)
                $element.className = CLASSES[name.toUpperCase()]

            return $element
        }

        $input.classList.add(CLASSES.INPUT)

        var $label
        function moveInLabel()
        {
        	if ($input.hasAttribute('id'))
	        {
	        	var id = $input.id
	        	if ($input.previousElementSibling)
	        	{
	        		if (id == $input.previousElementSibling.getAttribute('for'))
		        		$label = $input.previousElementSibling
	        	}
	        	else if ($input.nextElementSibling)
	        	{
	        		if (id == $input.nextElementSibling.getAttribute('for'))
		        		$label = $input.nextElementSibling
	        	}
	        }

	        if (!$label)
	        {
	        	$label = document.createElement('label')
	        	$input.after($label)
	        }

          $label.classList.add(CLASSES.LABEL)
	        $label.append($input)
        }
        moveInLabel()




        var $increment, $decrement
        function initControls()
        {
          $increment = create('span', 'increment')
          $decrement = create('span', 'decrement')

          $label.prepend($decrement)
          $label.append($increment)
        }
        initControls()





        on($increment, 'click', function()
        {
          $input.stepUp()
        })

        on($decrement, 'click', function()
        {
          $input.stepDown()
        })

        on($input, 'keydown', function(event)
        {
          switch(event.which)
          {
            case 38: // Up
              event.preventDefault()
              $input.stepUp()
              break
            case 40: // Down
              event.preventDefault()
              $input.stepDown()
              break
          }
        })

        on($input, 'change', function(event)
        {
          var value = +$input.value
          if ($input.max && value > +$input.max)
            $input.value = +$input.max
          else if ($input.min && value < +$input.min)
            $input.value = +$input.min
        })

	}

function on($emitter, types, handler)
{
    var events = types.split(' ')
    events.forEach(function(event)
    {
        $emitter.addEventListener(event, handler)
    })
    return $emitter
}

})()