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
    hotspots: { type: 'array', default: [] }
  },

  edit: function (props) {
    const { attributes: { imageUrl, hotspots }, setAttributes } = props;

    function addHotspot() {
      const newHotspots = [...hotspots, {
        x: 50, y: 50,
        label: 'Label',
        link: '',
        customClass: '',
        bgColor: '#ffffff',
        dotColor: '#434343'
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
          hotspots.map((hotspot, index) =>
            wp.element.createElement("div", { key: index, style: { marginBottom: '16px' } },
              wp.element.createElement("strong", null, `Hotspot ${index + 1}`),

              wp.element.createElement("label", null, "Label"),
              wp.element.createElement("input", {
                type: "text",
                value: hotspot.label,
                onChange: (e) => updateHotspot(index, 'label', e.target.value),
                style: { width: '100%', marginBottom: '8px' }
              }),

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

              wp.element.createElement("label", null, "Hotspot Background"),
              wp.element.createElement("input", {
                type: "color",
                value: hotspot.bgColor || '#ffffff',
                onChange: (e) => updateHotspot(index, 'bgColor', e.target.value),
                style: { width: '100%', marginBottom: '8px' }
              }),

              wp.element.createElement("label", null, "Dot Color"),
              wp.element.createElement("input", {
                type: "color",
                value: hotspot.dotColor || '#434343',
                onChange: (e) => updateHotspot(index, 'dotColor', e.target.value),
                style: { width: '100%', marginBottom: '8px' }
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
            wp.element.createElement("img", { src: imageUrl, style: { width: '100%', marginBottom: '10px' } }),
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
          className: `hotspot ${hotspot.customClass || ''}`,
          style: {
            position: 'absolute',
            top: `${hotspot.y}%`,
            left: `${hotspot.x}%`,
            transform: 'translate(-50%, -50%)',
            '--bg': hotspot.bgColor,
            '--dot-bg': hotspot.dotColor
          }
        }, hotspot.label))
      )
    );
  },

  save: function (props) {
    const { attributes: { imageUrl, hotspots } } = props;
    return wp.element.createElement("div", { className: "hotspot-wrapper", style: { position: 'relative', display: 'inline-block' } },
      imageUrl && wp.element.createElement("img", { src: imageUrl, style: { width: '100%' } }),
      hotspots.map((hotspot, index) => wp.element.createElement("a", {
        key: index,
        href: hotspot.link,
        className: `hotspot ${hotspot.customClass || ''}`,
        style: {
          position: 'absolute',
          top: `${hotspot.y}%`,
          left: `${hotspot.x}%`,
          transform: 'translate(-50%, -50%)',
          '--bg': hotspot.bgColor,
          '--dot-bg': hotspot.dotColor
        }
      }, hotspot.label))
    );
  }
});
