<?php
/*
 * View selected topic by id.
 *
 * DO NOT EDIT THIS FILE UNLESS YOU KNOW WHAT YOU ARE DOING!
 */
include 'header.php';
include 'connect.php';

$_ = $_GET;
$id = $_['id'];
$sql = mysqli_connect($connect_url,$connect_user,$connect_password,$connect_database);
if (mysqli_connect_errno($sql))
	die("Failed to connect to MySQL: " . mysqli_connect_error());
if(isset($_['content']))
{
	$content = $_['content'];
	$q = mysqli_query($sql,'insert into posts (reply,content) values (' . $id . ',"' . mysqli_real_escape_string($sql,$content) .  '");');
	header('Location: http://' . $_SERVER['HTTP_HOST'] . explode('?',$_SERVER['REQUEST_URI'],2)[0] . '?id=' . $id);
	die();
}
$thread = mysqli_query($sql,"SELECT * FROM threads WHERE id=" . $id);
$threadtitle = mysqli_fetch_array($thread)['title'];
$threadid = mysqli_fetch_array($thread)['id'];
echo '<title>' . $threadtitle . '</title>';
echo '<h1>' . $threadtitle . '</h1>';

$replys = mysqli_query($sql,"SELECT * FROM posts WHERE reply=" . $id);
while($row = mysqli_fetch_array($replys))
	echo '<hr/>' . str_replace('\n','<br/>',$row['content']) . '<br/>';
?>
<textarea rows=10 cols=40 id="content"></textarea><br/>
<button OnClick="window.location.href+='&content='+document.getElementById('content').value">Post</input>
<?php
include 'footer.php';
?>
