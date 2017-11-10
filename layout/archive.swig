{% extends '_layout.swig' %}
{% import '_macro/post-collapse.swig' as post_template %}
{% import '_macro/sidebar.swig' as sidebar_template %}

{% block title %}{{ __('title.archive') }} | {{ config.title }}{% endblock %}

{% block page_class %}page-archive{% endblock %}

{% block content %}

  {#####################}
  {### ARCHIVE BLOCK ###}
  {#####################}
  <div class="post-block archive post">
    <div id="posts" class="posts-collapse">
      <span class="archive-move-on"></span>

      <span class="archive-page-counter">
        {{ _p("counter.archive_posts", site.posts.length) }} (゜-゜)つロ 干杯~
      </span>

      {% for post in page.posts %}

        {# Show year #}
        {% set year %}
        {% set post.year = date(post.date, 'YYYY') %}

        {% if post.year !== year %}
          {% set year = post.year %}
          <div class="collection-title">
            <{% if theme.seo %}h2{% else %}h1{% endif %} class="archive-year" id="archive-year-{{ year }}">{{ year }}</{% if theme.seo %}h2{% else %}h1{% endif %}>
          </div>
        {% endif %}
        {# endshow #}

        {{ post_template.render(post) }}

      {% endfor %}

    </div>
  </div>
  {#########################}
  {### END ARCHIVE BLOCK ###}
  {#########################}

  {% include '_partials/pagination.swig' %}

{% endblock %}

{% block sidebar %}
  {{ sidebar_template.render(false) }}
{% endblock %}
