function curr_time() {
  var date = new Date();
  var current_time =
    date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();
  return current_time;
}
