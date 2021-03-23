{% if not (theme.duoshuo and theme.duoshuo.shortname) and not theme.duoshuo_shortname %}
  {% if theme.disqus.enable %}

    {% if page.comments %}
      <script type="text/javascript">
        window.DISQUS = null;
        new DisqusJS({
          shortname: '{{ theme.disqus.shortname }}',
          siteName: '{{ config.title }}',
          identifier: '{{ page.path }}',
          url: '{{ page.permalink }}',
          api: '{{ theme.disqus.api }}',
          apikey: '{{ theme.disqus.apikey }}',
          admin: '{{ theme.disqus.admin }}',
          adminLabel: '{{ theme.disqus.adminLabel }}',
        });
      </script>
    {% endif %}

  {% endif %}
{% endif %}
