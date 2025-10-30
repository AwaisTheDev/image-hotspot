import './style.css';
const { registerBlockType } = wp.blocks;
const { MediaUpload, InspectorControls } = wp.blockEditor;
const { PanelBody, Button } = wp.components;

registerBlockType('mytheme/image-hotspots', {
  title: 'Image Hotspots',
  icon: 'location-alt',
  category: 'media',
  attributes: {
    imageUrl: { type: 'string', default: '' },
    imageWidth: { type: 'number', default: 100 },
    iconSize: { type: 'number', default: 3 },
    hotspots: { type: 'array', default: [] }
  },

  edit: function (props) {
    const { attributes: { imageUrl, imageWidth, iconSize, hotspots }, setAttributes } = props;

    function addHotspot() {
      const newHotspots = [...hotspots, {
        x: 50, y: 50,
        link: '',
        customClass: '',
        iconUrl: ''
      }];
      setAttributes({ hotspots: newHotspots });
    }

    function updateHotspot(index, field, value) {
      const newHotspots = hotspots.map((h, i) => i === index ? { ...h, [field]: value } : h);
      setAttributes({ hotspots: newHotspots });
    }

    function removeHotspot(index) {
      const newHotspots = hotspots.filter((_, i) => i !== index);
      setAttributes({ hotspots: newHotspots });
    }

    return wp.element.createElement(
      "div",
      null,

      // Sidebar
      wp.element.createElement(InspectorControls, null,
        wp.element.createElement(PanelBody, { title: "Hotspot Settings", initialOpen: true },
          wp.element.createElement(Button, { isPrimary: true, onClick: addHotspot, style: { marginBottom: '10px' } }, "Add Hotspot"),
          wp.element.createElement("label", null, "Image width (%)"),
          wp.element.createElement("input", {
            type: "range", min: "10", max: "100", step: "1", value: imageWidth,
            onChange: e => setAttributes({ imageWidth: parseInt(e.target.value, 10) }),
            style: { width: '100%', marginBottom: '16px' }
          }),

          wp.element.createElement("label", null, "Icon size (%)"),
          wp.element.createElement("input", {
            type: "range", min: "1", max: "20", step: "1", value: iconSize,
            onChange: e => setAttributes({ iconSize: parseInt(e.target.value, 10) }),
            style: { width: '100%', marginBottom: '16px' }
          }),
          hotspots.map((hotspot, index) =>
            wp.element.createElement("div", { key: index, style: { marginBottom: '16px' } },
              wp.element.createElement("strong", null, `Hotspot ${index + 1}`),

              wp.element.createElement("label", null, "Link"),
              wp.element.createElement("input", {
                type: "text",
                value: hotspot.link,
                onChange: (e) => updateHotspot(index, 'link', e.target.value),
                style: { width: '100%', marginBottom: '8px' }
              }),

              wp.element.createElement("label", null, "Custom Class"),
              wp.element.createElement("input", {
                type: "text",
                value: hotspot.customClass || '',
                onChange: (e) => updateHotspot(index, 'customClass', e.target.value),
                style: { width: '100%', marginBottom: '8px' }
              }),

              wp.element.createElement("label", null, "Icon"),
              wp.element.createElement(MediaUpload, {
                onSelect: media => updateHotspot(index, 'iconUrl', media.url),
                type: "image",
                render: ({ open }) => wp.element.createElement(Button, { onClick: open, isSecondary: true, style: { marginBottom: '8px' } }, hotspot.iconUrl ? 'Replace Icon' : 'Select Icon')
              }),

              wp.element.createElement("label", null, "X Position"),
              wp.element.createElement("input", {
                type: "range", min: "0", max: "100", value: hotspot.x,
                onChange: e => updateHotspot(index, 'x', parseFloat(e.target.value)),
                style: { width: '100%' }
              }),

              wp.element.createElement("label", null, "Y Position"),
              wp.element.createElement("input", {
                type: "range", min: "0", max: "100", value: hotspot.y,
                onChange: e => updateHotspot(index, 'y', parseFloat(e.target.value)),
                style: { width: '100%' }
              }),

              wp.element.createElement(Button, {
                isDestructive: true,
                onClick: () => removeHotspot(index),
                style: { marginTop: '8px' }
              }, 'Remove')
            )
          )
        )
      ),

      // Image + Hotspots
      wp.element.createElement("div", { className: "hotspot-wrapper", style: { position: 'relative', display: 'inline-block' } },

        imageUrl
          ? wp.element.createElement("div", null,
            wp.element.createElement("img", { src: imageUrl, style: { width: `${imageWidth}%`, marginBottom: '10px' } }),
            wp.element.createElement(MediaUpload, {
              onSelect: media => setAttributes({ imageUrl: media.url }),
              type: "image",
              render: ({ open }) => wp.element.createElement(Button, { onClick: open, isSecondary: true }, "Replace Image")
            })
          )
          : wp.element.createElement(MediaUpload, {
            onSelect: media => setAttributes({ imageUrl: media.url }),
            type: "image",
            render: ({ open }) => wp.element.createElement(Button, { onClick: open }, "Select Image")
          }),

        hotspots.map((hotspot, index) => wp.element.createElement("div", {
          key: index,
          className: `hotspot ${hotspot.customClass || ''} ${hotspot.iconUrl ? 'has-icon' : ''}`,
          style: {
            position: 'absolute',
            top: `${hotspot.y}%`,
            left: `${hotspot.x}%`,
            transform: 'translate(-50%, -50%)'
          }
        }, hotspot.iconUrl && wp.element.createElement('img', { src: hotspot.iconUrl, className: 'hotspot-icon', alt: '', style: { width: `${iconSize}%`, height: `${iconSize}%` } })))
      )
    );
  },

  save: function (props) {
    const { attributes: { imageUrl, hotspots } } = props;
    return wp.element.createElement("div", { className: "hotspot-wrapper", style: { position: 'relative', display: 'inline-block' } },
      imageUrl && wp.element.createElement("img", { src: imageUrl, style: { width: `${props.attributes.imageWidth || 100}%` } }),
      hotspots.map((hotspot, index) => wp.element.createElement("a", {
        key: index,
        href: hotspot.link,
        className: `hotspot ${hotspot.customClass || ''} ${hotspot.iconUrl ? 'has-icon' : ''}`,
        style: {
          position: 'absolute',
          top: `${hotspot.y}%`,
          left: `${hotspot.x}%`,
          transform: 'translate(-50%, -50%)'
        }
      }, hotspot.iconUrl && wp.element.createElement('img', { src: hotspot.iconUrl, className: 'hotspot-icon', alt: '', style: { width: `${props.attributes.iconSize || 3}%`, height: `${props.attributes.iconSize || 3}%` } })))
    );
  }
});
