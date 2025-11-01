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
    hotspots: { type: 'array', default: [] }
  },

  edit: function (props) {
    const { attributes: { imageUrl, imageWidth, hotspots }, setAttributes } = props;

    function addHotspot() {
      const newHotspots = [...hotspots, {
        x: 50, y: 50,
        link: '',
        customClass: '',
        title: '',
        titleSpan: '',
        subtitle: '',
        color: '#000000',
        showDot: false,
        showDivider: false
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

              wp.element.createElement("label", null, "Title"),
              wp.element.createElement("input", {
                type: "text",
                value: hotspot.title || '',
                onChange: (e) => updateHotspot(index, 'title', e.target.value),
                style: { width: '100%', marginBottom: '8px' }
              }),

              wp.element.createElement("label", null, "Title Span"),
              wp.element.createElement("input", {
                type: "text",
                value: hotspot.titleSpan || '',
                onChange: (e) => updateHotspot(index, 'titleSpan', e.target.value),
                style: { width: '100%', marginBottom: '8px' },
                placeholder: "Optional span content inside title"
              }),

              wp.element.createElement("label", null, "Subtitle"),
              wp.element.createElement("input", {
                type: "text",
                value: hotspot.subtitle || '',
                onChange: (e) => updateHotspot(index, 'subtitle', e.target.value),
                style: { width: '100%', marginBottom: '8px' }
              }),

              wp.element.createElement("label", null, "Color"),
              wp.element.createElement("input", {
                type: "color",
                value: hotspot.color || '#000000',
                onChange: (e) => updateHotspot(index, 'color', e.target.value),
                style: { width: '100%', marginBottom: '8px' }
              }),

              wp.element.createElement("label", { style: { display: 'flex', alignItems: 'center', marginBottom: '8px' } },
                wp.element.createElement("input", {
                  type: "checkbox",
                  checked: hotspot.showDot || false,
                  onChange: (e) => updateHotspot(index, 'showDot', e.target.checked),
                  style: { marginRight: '8px' }
                }),
                "Show Dot"
              ),

              wp.element.createElement("label", { style: { display: 'flex', alignItems: 'center', marginBottom: '8px' } },
                wp.element.createElement("input", {
                  type: "checkbox",
                  checked: hotspot.showDivider || false,
                  onChange: (e) => updateHotspot(index, 'showDivider', e.target.checked),
                  style: { marginRight: '8px' }
                }),
                "Show Divider"
              ),

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
          className: `hotspot ${hotspot.customClass || ''}`,
          style: {
            position: 'absolute',
            top: `${hotspot.y}%`,
            left: `${hotspot.x}%`,
            transform: 'translate(-50%, -50%)',
            '--hotspot-color': hotspot.color || '#000000'
          }
        }, [
          hotspot.showDot && wp.element.createElement('div', { key: 'dot', className: 'dot' }),
          wp.element.createElement('div', { key: 'tooltip-wrapper', className: 'tooltip-wrapper' }, [
            hotspot.showDivider && wp.element.createElement('div', { key: 'divider', className: 'divider' }),
            wp.element.createElement('div', { key: 'inner', className: 'inner' }, [
              hotspot.subtitle && wp.element.createElement('div', { key: 'subtitle', className: 'hotspot subtitle' }, hotspot.subtitle),
              hotspot.title && wp.element.createElement('div', { key: 'title', className: 'hotspot-title' }, [
                hotspot.title,
                hotspot.titleSpan && wp.element.createElement('span', { key: 'span' }, hotspot.titleSpan)
              ])
            ])
          ])
        ]))
      )
    );
  },

  save: function (props) {
    const { attributes: { imageUrl, hotspots } } = props;
    return wp.element.createElement("div", { className: "hotspot-wrapper", style: { position: 'relative', display: 'inline-block' } },
      imageUrl && wp.element.createElement("img", { src: imageUrl, style: { width: `${props.attributes.imageWidth || 100}%` } }),
      hotspots.map((hotspot, index) => {
        const hotspotContent = [
          hotspot.showDot && wp.element.createElement('div', { key: 'dot', className: 'dot' }),
          wp.element.createElement('div', { key: 'tooltip-wrapper', className: 'tooltip-wrapper' }, [
            hotspot.showDivider && wp.element.createElement('div', { key: 'divider', className: 'divider' }),
            wp.element.createElement('div', { key: 'inner', className: 'inner' }, [
              hotspot.subtitle && wp.element.createElement('div', { key: 'subtitle', className: 'hotspot-subtitle' }, hotspot.subtitle),
              hotspot.title && wp.element.createElement('div', { key: 'title', className: 'hotspot-title' }, [
                hotspot.title,
                hotspot.titleSpan && wp.element.createElement('span', { key: 'span' }, hotspot.titleSpan)
              ])
            ])
          ])
        ];

        const hotspotProps = {
          key: index,
          className: `hotspot ${hotspot.customClass || ''}`,
          style: {
            position: 'absolute',
            top: `${hotspot.y}%`,
            left: `${hotspot.x}%`,
            transform: 'translate(-50%, -50%)',
            '--hotspot-color': hotspot.color || '#000000'
          }
        };

        return hotspot.link
          ? wp.element.createElement("a", { ...hotspotProps, href: hotspot.link, style: { ...hotspotProps.style, textDecoration: 'none' } }, hotspotContent)
          : wp.element.createElement("div", hotspotProps, hotspotContent);
      })
    );
  }
});
