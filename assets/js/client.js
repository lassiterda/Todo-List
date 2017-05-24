

$(".todo-check").on("click", function(event) {
  todoItem = event.target.parentElement.parentElement
  $(todoItem).fadeOut(function(){ $(todoItem).remove() })

});
