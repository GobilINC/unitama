/**
* prettyEmbed.js | v1.2.0 | https://github.com/mike-zarandona/prettyembed.js
*/
!function(a,b){a.fn.prettyEmbed=function(c){function g(d){var e=d.find("img").outerWidth(!0),f=d.find("img").outerHeight(!0),g="",h="";d.attr("data-pe-videoid")!==b?h=d.attr("data-pe-videoid"):c.videoID!==b?h=c.videoID:(h=b,console.error("PrettyEmbed.js Error:  Misformed or missing video ID.")),("false"===d.attr("data-pe-show-info")||c.showInfo===!1)&&(g+="&showinfo=0"),("false"===d.attr("data-pe-show-controls")||c.showControls===!1)&&(g+="&controls=0"),("true"===d.attr("data-pe-loop")||c.loop===!0)&&(g+="&loop=1"),("true"===d.attr("data-pe-closed-captions")||c.closedCaptions===!0)&&(g+="&cc_load_policy=1"),(d.attr("data-pe-localization")!==b||c.localization!==b)&&(d.attr("data-pe-localization")!==b?g+="&hl="+d.attr("data-pe-localization"):c.localization!==b&&(g+="&hl="+c.localization)),("light"==d.attr("data-pe-color-scheme")||"light"==c.colorScheme)&&(g+="&theme=light"),g+="false"===d.attr("data-pe-show-related")||c.showRelated===!1?"&rel=0":"&rel=1",d.html('<iframe width="'+e+'" height="'+f+'" style="border:none;" src="//www.youtube.com/embed/'+h+"?autoplay=1"+g+'"></iframe>').addClass("play"),c.useFitVids&&a.isFunction(a.fn.fitVids)&&d.parent().fitVids()}function h(a){var b=/^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#\&\?]*).*/,c=a.match(b);return c&&11==c[7].length?c[7]:(console.error("PrettyEmbed.js Error:  Bad URL."),void 0)}c=a.extend({},a.fn.prettyEmbed.options,c);var d=/Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent)?!0:!1;0===a("#pretty-embed-style").length&&a("<style />",{id:"pretty-embed-style",html:'.pretty-embed{position:relative;cursor:pointer;display:block}.pretty-embed img{width:100%;height:auto}.pretty-embed iframe{border:0 solid transparent}.pretty-embed:after{display:block;content:"";position:absolute;top:50%;margin-top:-19px;left:50%;margin-left:-27px;width:54px;height:38px;background-image:url(data:image/png;base64,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);-webkit-background-size:cover;background-size:cover}.pretty-embed.play:after{display:none}.pretty-embed:hover:after{background-image:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGwAAABMCAYAAACIylL7AAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAAadEVYdFNvZnR3YXJlAFBhaW50Lk5FVCB2My41LjExR/NCNwAABwhJREFUeF7t3GlsVFUYBuCDIi4xGreA1O6dmXbaYQ2oCAriGjUuRDSiETVRISGCu2BcAH8gagKKpnWJ5UcBFVQIGhMDFGwVGcqU0m2WtkPpIqNSbEHaQj/fM5yh9HLAAlP6TTlv8iSdc+899/a8PenMnxHRSp3LIQ2ASyAO0mEUjIe7YTJMhWnwAsyBebAQFkM2fAl58A18Dz/Az7ABNsFm2AIeKIZypRIC/8MLkfO3g5zDDXLOXyAf5L1+hNWwEpZBLuTAh/AezIfX4UWYDk/AQ3APTIDR4IR4uBTOh35qmc5sdmU5BsC4XS7HLPgE1sAWqIK/4QB0ABlhci3kmuyBaiiCHyAHXsZaToSL1PJGL5jUBZ9BE5ARVfsgD64DteKnmNos++W1WY4v4CCQ0aM6YBXEqeU/uaCskRAETGacQSGYqGroXnZm2m+Cf4CMXtEKk1QdJw5OdECTutDoPQdgjKpFn2Cm/RwoBDJY8MEFqp5jE3TaJ1suMHrfLFVP19Q47f3ADWSwUgvnqZo6g8FRR51k8HKfqqkz1U77B0AGS8tVTYdTnWGT/EAGS3thgKpLiKoMWyqQwdqNqq5wYY9bDhr8zFF1CRHIsC0BMlj7VtWFwtJt64EM1ryqLiH86bYAkMFaC/SXZfVXL3QnGbxcJXyOtCuAjJgwRBbmtAwafN0qvI608UDc+ZwO8g8fqj12FnlUFvagZZAl/8hh1PZHI9W99Sb5XJnac84CM0WlPW0aEHe+EcOIDh0imWa/n2qen0VeZ7r23D5svixsjmWQpaMLk2lva6PQVjdVTXuWKtPt2mv6oI9FhT3tPSDuvJbCItm3dy/V5+dT4ImpVOGwaa/tQ5aJCltaDhB33uH6wmTkbvuroYHqfvqJ/A8/pL2+j1grym2py4G4q8Q7xOMVFkkLdtsfwSDtWv09+e6/VztPjNskC1tjGWSpO4XJRHZbY3U11X61grx33qGdL0YVibK01HVA3FV0s7BIIrtNFrdzaS5VTpygnTfGVMrCCi2DLFUMO7nCZI7stpoaagwEKJidTRVjb9DOHyOCojQt1Q3E3akUFsmR3SaL8/moZtEiKr92tPY+zDXIwjyWQZbKT6MwmS67DRoqKqh6wQIqGzFcez+mQmJHaqoHiLuyoadXWCQtTU2du00WV1pKVW+/TaUul/a+zMjCUlBYCl7wVjZ0SFQKk7HuNqne46HAq69SqTNDe38mQqIEhQFxF83CIunyvy1SnNtN/pkzaUe6Q/scvQyFpaCwFLxgrrQHCpPR7TaprrCQvE8/rX2WXhQS21EYEHelQ3qmsEi67LaqKgrm5lLZhAnaZ+lFsVPYjh4uTKa9tZV2ff01ld1+u/YZGAiJYhQGxF1PF9ZcUEC+SZO092YEhSWjsGS8YG6Hq2cK2+feSoEpU7T3ZCgkPCgMiLuSKBe2v6SEqp58ijz4y9XdjylZWDIKS8YL3krwwTYahf3r9VLN9OnkwQdR3X2YC4ltSckeIO62Z51eYQfw7i8463kUlaadP0aEC3NbBlk61cLa6utp5+zZ5LHZtfPGmAZRlJRcCMRd8UkW1rZ7N9XOnUvbHOna+WJUjSxsnWWQpe4W1r5nD9UteJc8zkztPDGuUmxNTF4DxJ0n88SFHWxupvpFi8njGqq9vo8okoUtswyydLzCDu3fT43ZOVQ8fKT2uj5mo3AnJuUAcbfNUlhHayvtzl1KxaOv1Z7fR60V7oSkhUDcbcvMChfW0d5OoRVf0fYxY7Xn9XF5YktC0mwg7orwJuLPb7+jkvE3a4+fJZbIwqZZBg2+5onf45MeBDJiwkxZ2HjLoMHXFLE5PikDyIgJt8rCLoeOowYNvlzit2sSz4UWIIO9K8NfrIIf/JYDBj9yU/UPF/brNYnrgAzWKsNlyfwal/ghkMHaKlWXEIVxiY8BGay9puoKF5ZsOWjwM1bVFS5MFMQleoEMlpqg6zdrFwxOXAhksJSnaurML4MTRgAZLN2tauoMBqXNR51k8FADhz9/WbNpcMIDm65OIIORwQkzVD3HBif0g/wuFxi9qRw6v69el41XJ6TCX0BGr9oPo1QtJw5OvA7+VhcaZ96/cJeqo3vJH5TghDIg44xqgHGqhpMLLrwwf1D8W7AXMJnRgw5BHtZ8oFr+U8+GQfGXwQzYCG1ARtQ0wRcwDNSKRzGY9GIYB89sGBi/AFbAFqiFZjgIZITJtWiBRiiHAlgJi0FugBvgxO8CezLrB8afAxfBVZACQ+B6uAXugckwFZ6F5+AVeAPegYWwGD6Bz2EpLIeVsBrWws+wHjbCb/A7eKAYypXAcUSOl4C8ZitshgKQ88m5f4Q1sArkvXPhU/gI3gf5nPJ5X4IZ8BQ8AvfBbTAG5O8sf3e5BnItzlXLE4UI8R86m8y4ltOs9gAAAABJRU5ErkJggg==)}'}).appendTo("head"),c.useFitVids&&(a.isFunction(a.fn.fitVids)||console.error("PrettyEmbed.js Error:  options.useFitVids is set to true; FitVids not found!"));var f;f=0===a(this).length?a(".pretty-embed"):a(this),f.each(function(){a(this).addClass("pretty-embed");var e,k,l,m,n,o,p,q,f="",i="",j="";if(f=a(this).attr("data-pe-videoid")!==b?a(this).attr("data-pe-videoid"):a(this).attr("href")!==b?h(a(this).attr("href")):c.videoID,i=a(this).attr("data-pe-preview-size")!==b?a(this).attr("data-pe-preview-size"):c.previewSize!==b?c.previewSize:b,j=a(this).attr("data-pe-custom-preview-image")!==b?a(this).attr("data-pe-custom-preview-image"):c.customPreviewImage!==b?c.customPreviewImage:b,k=a(this).attr("data-pe-show-info")!==b?a(this).attr("data-pe-show-info"):c.showInfo!==b?c.showInfo:b,l=a(this).attr("data-pe-show-controls")!==b?a(this).attr("data-pe-show-controls"):c.showControls!==b?c.showControls:b,m=a(this).attr("data-pe-loop")!==b?a(this).attr("data-pe-loop"):c.loop!==b?c.loop:b,n=a(this).attr("data-pe-closed-captions")!==b?a(this).attr("data-pe-closed-captions"):c.closedCaptions!==b?c.closedCaptions:b,o=a(this).attr("data-pe-localization")!==b?a(this).attr("data-pe-localization"):c.localization!==b?c.localization:b,p=a(this).attr("data-pe-color-scheme")!==b?a(this).attr("data-pe-color-scheme"):c.colorScheme!==b?c.colorScheme:b,q=a(this).attr("data-pe-show-related")!==b?a(this).attr("data-pe-show-related"):c.showRelated!==b?c.showRelated:b,a(this).is("a")&&(e=a("<div />").addClass("pretty-embed"),e.attr("data-pe-videoid",f).attr("data-pe-preview-size",i).attr("data-pe-custom-preview-image",j).attr("data-pe-show-info",k).attr("data-pe-show-controls",l).attr("data-pe-loop",m).attr("data-pe-closed-captions",n).attr("data-pe-localization",o).attr("data-pe-color-scheme",p).attr("data-pe-show-related",q),a(this).after(e)),j!==b&&""!==j)a(this).html('<img src="'+j+'" width="100%" alt="YouTube Video Preview" />');else{var r="";switch(i){case"thumb-default":r="default";break;case"thumb-1":r="1";break;case"thumb-2":r="2";break;case"thumb-3":r="3";break;case"default":r="mqdefault";break;case"medium":r="0";break;case"high":r="hqdefault";break;default:r="maxresdefault"}a(this).html('<img src="//img.youtube.com/vi/'+f+"/"+r+'.jpg" width="100%" alt="YouTube Video Preview" />')}a(this).is("a")&&(e.html(a(this).html()),a(this).remove()),d&&a(this).waitForImages(function(){g(a(this))})}),a("body").on("click",".pretty-embed",function(b){b.preventDefault(),g(a(this))}),a.fn.prettyEmbed.options={videoID:"",previewSize:"",customPreviewImage:"",showInfo:!0,showControls:!0,loop:!1,closedCaptions:!1,colorScheme:"dark",showRelated:!1,useFitVids:!1}}}(jQuery);