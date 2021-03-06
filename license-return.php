<?php
/**
 * Returns/gets the selected license from the modal and stores it.
 *
 * @package CC_WordPress_Plugin
 */

if ( ! empty( $_GET['url'] ) ) {
	$license['url'] = $_GET['url'];
}
if ( ! empty( $_GET['name'] ) ) {
	$license['name'] = $_GET['name'];
}
if ( ! empty( $_GET['button'] ) ) {
	$license['button'] = $_GET['button'];
}
if ( ! empty( $_GET['deed'] ) ) {
	$license['deed'] = $_GET['deed'];
}

$license = array_map(
	function( $retval ) {
		return filter_var( $retval, FILTER_SANITIZE_STRING );
	},
	$license
);

?>
<html>
	<head>
		<script src="https://ajax.googleapis.com/ajax/libs/jquery/1.12.0/jquery.min.js"></script>
	</head>
	<body>
		<script>
			jQuery(function($) {
			parent.setLicense( $.parseJSON( '<?php echo json_encode( $license ); ?>' ) );
				parent.tb_remove();
			});
		</script>
	</body>
</html>
