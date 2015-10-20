(function()
{
    "use strict"

    if (typeof Object.assign == "function")
        return Function.prototype

    return function(global)
    {
        var $Object$ = global.Object

        var $OwnStrings$ = $Object$.getOwnPropertyNames
        var $OwnSymbols$ = $Object$.getOwnPropertySymbols

        var $IsEnumerable$ = $Object$.prototype.propertyIsEnumerable

        ///

        $Object$.defineProperty($Object$, "assign",
        {
            value: function assign(target, sources)
            {
                if (target == null) throw new global.TypeError()

                var to = $Object$(target)

                for (var index = 1; index < arguments.length; ++index)
                {
                    var source = arguments[index]
                    if (source == null) continue

                    var from = $Object$(source)
                    var keys = $OwnStrings$(from).concat
                    (
                        typeof $OwnSymbols$ == "function"
                            && $OwnSymbols$(from)
                            || [ ]
                    )

                    keys.forEach(function(key)
                    {
                        if ($IsEnumerable$.call(from, key))
                            to[key] = from[key]
                    })
                }

                return to
            },
            writable: true,
            configurable: true
        })
    }
})()(this)
