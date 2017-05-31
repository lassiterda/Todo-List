var todoIcons = "<i class='material-icons secondary-content red-text todo-remove'>close</i><i class='material-icons secondary-content todo-check'>check</i>"

//Complete incomplete to-do item when itx 'X' icon is clicked
$(".todo-check").on("click", function(event) {
  $todoItem = $(event.target.parentElement.parentElement)
  $.post("/api/complete/" + $todoItem.attr('id'), function(res) {
    if(res) {
      $todoItem.fadeOut(function(){
        $todoItem.detach()
        $(".complete-list").children(".collection").prepend($todoItem)})
        $todoItem.find(".material-icons").remove();
        $todoItem.fadeIn()
    }
    else {
      console.log("unable to mark Todo Item complete");
    }
  })
});


//delete incomplete to-do item when itx 'X' icon is clicked
$(".todo-remove").on("click", function(event) {
  $todoItem = $(event.target.parentElement.parentElement)
  $.post("/api/delete/" + $todoItem.attr('id'), function(res) {
    if(res) {
      $todoItem.fadeOut(function(){
        $todoItem.detach()
      })
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

  $.post("/api/create",{todo_text: todoText}, function(res) {
    if(res) {
      var $newTodo = $("<li>");
      $newTodo.addClass("collection-item dismissable todo-item");
      $newTodo.append("div").html(todoText);
      $newTodo.append(todoIcons);
      $(".todo-list").children(".collection").append($newTodo).fadeIn();
    }
    else {
      console.log("unable to add Todo Item");
    }
  })
})
