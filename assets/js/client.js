$(".todo-check").on("click", function(event) {
  $todoItem = $(event.target.parentElement.parentElement)
  $.post("/" + $todoItem.attr('id'), function(res) {
    if(res) {
      $todoItem.fadeOut(function(){ $todoItem.remove() })
    }
    else {
      console.log("unable to mark Todo Item complete");
    }
  })
});

$("#new-todo").on("submit", function(event) {
  event.preventDefault();
  todoText = $("#todo-input").val().trim();
  $("#todo-input").val("");
  $.post("/",{todo_text: todoText}, function(res) {
    if(res) {
      console.log("Todo Item Added");
    }
    else {
      console.log("unable to add Todo Item");
    }
  })
})
