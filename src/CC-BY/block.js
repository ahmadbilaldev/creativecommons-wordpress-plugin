/**
 * BLOCK: CC-BY
 */

//  Import CSS.
import './style.scss';
import './editor.scss';

const { __ } = wp.i18n; // Import __() from wp.i18n
const { registerBlockType } = wp.blocks; // Import registerBlockType() from wp.blocks
//const { InspectorControls, withColors, PanelColorSettings, getColorClassName } = wp.editor;
const { InspectorControls } = wp.editor;
const { PanelColorSettings } = wp.editor;
const { ColorPalette } = wp.editor;

/**
 * Register: CC-By Gutenberg block.
 *
 * Registers a new block provided a unique name and an object defining its
 * behavior. Once registered, the block is made editor as an option to any
 * editor interface where blocks are implemented.
 *
 * @link https://wordpress.org/gutenberg/handbook/block-api/
 * @param  {string}   name     Block name.
 * @param  {Object}   settings Block settings.
 * @return {?WPBlock}          The block, if it has been successfully
 *                             registered; otherwise `undefined`.
 */
registerBlockType( 'cgb/cc-by', {
	// Block name. Block names must be string that contains a namespace prefix. Example: my-plugin/my-custom-block.
	title: __( 'CC-BY' ), // Block title.
	icon: 'media-text', // Block icon from Dashicons → https://developer.wordpress.org/resource/dashicons/.
	category: 'cc-licenses', // Block category — Group blocks together based on common traits E.g. common, formatting, layout widgets, embed.
	keywords: [ __( 'creative commons' ), __( 'CC-BY' ), __( 'attribution' ) ],

	// Attributes
	attributes: {
		// To storage background colour of the div
		background_color: {
			type: 'string',
			default: 'red', // Default value for newly added block
		},
		// To storage the complete style of the div that will be 'merged' with the selected colors
		block_style: {
			selector: 'div', // From tag a
			source: 'attribute', // binds an attribute of the tag
			attribute: 'style', // binds style of a: the dynamic colors
		},
	},

	/**
	 * The edit function describes the structure of your block in the context of the editor.
	 * This represents what the editor will render when the block is used.
	 *
	 * The "edit" property must be a valid function.
	 *
	 * @link https://wordpress.org/gutenberg/handbook/block-api/block-edit-save/
	 */
	edit: function( props ) {
		const background_color = props.attributes.background_color; // To bind button background color
		// Style object for the button
		// I created a style in JSX syntax to keep it here for
		// the dynamic changes
		let block_style = props.attributes.block_style; // To bind the style of the button
		block_style = {
			backgroundColor: background_color,
			color: '#000',
			padding: '14px 25px',
			fontSize: '16px',
		};
		// onChange event functions
		function onChangeBgColor( content ) {
			props.setAttributes( { background_color: content } );
		}

		// Creates a <p class='wp-block-cgb-block-cc-block'></p>.
		return [
			<InspectorControls>
				<PanelColorSettings
					title={ __( 'Color Settings', 'creativecommons' ) }
					colorSettings={ [
						{
							onChange={ onChangeBgColor }, // onChange event callback
							label: __( 'Background Color' ),
						},
					] }
				/>
			</InspectorControls>,
			<div className={ props.className } style={ block_style }>
				<img src="https://licensebuttons.net/l/by/3.0/88x31.png" alt="CC-BY" />
				<p>
					This blog post is licensed under a{ ' ' }
					<a href="https://creativecommons.org/licenses/by/4.0/">
						Creative Commons Attribution 4.0 International license.
					</a>
				</p>
			</div>,
		];
	},

	/**
	 * The save function defines the way in which the different attributes should be combined
	 * into the final markup, which is then serialized by Gutenberg into post_content.
	 *
	 * The "save" property must be specified and must be a valid function.
	 *
	 * @link https://wordpress.org/gutenberg/handbook/block-api/block-edit-save/
	 */
	save: function( props ) {
		const block_style = {
			backgroundColor: props.attributes.background_color,
		};
		return (
			<div style={ block_style }>
				<img src="https://licensebuttons.net/l/by/3.0/88x31.png" alt="CC" />
				<p>
					This blog post is licensed under a{ ' ' }
					<a href="https://creativecommons.org/licenses/by/4.0/">
						Creative Commons Attribution 4.0 International license.
					</a>
				</p>
			</div>
		);
	},
} );
