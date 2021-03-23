{% macro render(is_post) %}
  <div class="sidebar-toggle">
    <div class="sidebar-toggle-line-wrap">
      <span class="sidebar-toggle-line sidebar-toggle-line-first"></span>
      <span class="sidebar-toggle-line sidebar-toggle-line-middle"></span>
      <span class="sidebar-toggle-line sidebar-toggle-line-last"></span>
    </div>
  </div>

  <aside id="sidebar" class="sidebar">
    {% if theme.sidebar.onmobile %}
      <div id="sidebar-dimmer"></div>
    {% endif %}
    <div class="sidebar-inner">

      {% set display_toc = is_post and theme.toc.enable or is_page and theme.toc.enable %}

      {% if display_toc and toc(page.content).length > 1 %}
        <ul class="sidebar-nav motion-element">
          <li class="sidebar-nav-toc sidebar-nav-active" data-target="post-toc-wrap">
            {{ __('sidebar.toc') }}
          </li>
          <li class="sidebar-nav-overview" data-target="site-overview-wrap">
            {{ __('sidebar.overview') }}
          </li>
        </ul>
      {% endif %}

      <section class="site-overview-wrap sidebar-panel{% if not display_toc or toc(page.content).length <= 1 %} sidebar-panel-active{% endif %}">
        <div class="site-overview">
          <div class="site-author motion-element" itemprop="author" itemscope itemtype="http://schema.org/Person">
            {% if theme.avatar %}
              <img class="site-author-image" itemprop="image"
                src="{{ url_for( theme.card.avatar | default(theme.images + '/card.jpg') ) }}"
                alt="{{ theme.author }}" />
            {% endif %}
              <p class="site-author-name" itemprop="name">{{ theme.card.name }}</p>
              <p class="site-description motion-element" itemprop="description">{#
            #}{% if theme.seo %}{#
              #}{{ theme.signature }}{#
            #}{% else %}{#
              #}{{ theme.card.description }}{#
            #}{% endif %}{#
            #}</p>
          </div>

          <div class="links-of-author motion-element">
            {% if theme.social %}
              {% for name, link in theme.social %}
                <span class="links-of-author-item scaleup">
                  <a href="{{ trim(link.split('||')[0]) }}" target="_blank" title="{{ name }}">
                    {% if theme.social_icons.enable %}
                      {{ link.split('||')[1] }}{#
                  #}{% endif %}{#
                    #}{% if not theme.social_icons.icons_only %}{#
                      #}{{ name }}{#
                    #}{% endif %}{#
                #}</a>
                </span>
              {% endfor %}
            {% endif %}
          </div>

          <div class="des-of-author">
              <div class="des-of-author-nav">
                {% for title, des in theme.card.items %}
                  {% if loop.index === 1 %}
                    <div class="des-of-author-title active" data-index="{{ loop.index }}">{{ title }}</div>
                  {% else %}
                    <div class="des-of-author-title" data-index="{{ loop.index }}">{{ title }}</div>
                  {% endif %}
                {% endfor %}
              </div>
              <div class="des-of-author-panel">
                {% for title, des in theme.card.items %}
                  {% if loop.index === 1 %}
                    <div class="des-of-author-des active" data-index="{{ loop.index }}">{{ des }}</div>
                  {% else %}
                    <div class="des-of-author-des" data-index="{{ loop.index }}">{{ des }}</div>
                  {% endif %}
                {% endfor %}
              </div>
          </div>

          <details class="views-top-wrap">
            <summary class="views-top-name scaleup">看爆 Top5</summary>
            <ul class="views-top"></ul>
          </details>

          {#
          {% if theme.rss %}
            <div class="feed-link motion-element">
              {% if theme.emailfeed %}
              <a class="feed-email" href="{{ theme.emailfeed }}" rel="alternate" target="_blank">
                <i class="fas fa-envelope"></i>
                <span>Email 订阅</span>
              </a>
              {% endif %}
              <a class="feed-rss" href="{{ url_for(theme.rss) }}" rel="alternate" target="_blank">
                <i class="fas fa-rss"></i>
                <span>RSS 订阅</span>
              </a>
            </div>
          {% endif %}

          <nav class="site-state motion-element">

            {% if config.archive_dir != '/' and site.posts.length > 0 %}
              <div class="site-state-item site-state-posts">
              {% if theme.menu.archives %}
                <a href="{{ trim(url_for(theme.menu.archives).split('||')[0]) }}">
              {% else %}
                <a href="{{ url_for(config.archive_dir) }}">
              {% endif %}
                  <span class="site-state-item-count">{{ site.posts.length }}</span>
                  <span class="site-state-item-name">{{ __('state.posts') }}</span>
                </a>
              </div>
            {% endif %}

            {% if site.categories.length > 0 %}
              {% set categoriesPageQuery = site.pages.find({type: 'categories'}, {lean: true}) %}
              {% set hasCategoriesPage = categoriesPageQuery.length > 0 %}
              <div class="site-state-item site-state-categories">
                {% if hasCategoriesPage %}<a href="{{ url_for(categoriesPageQuery[0].path) }}">{% endif %}
                  <span class="site-state-item-count">{{ site.categories.length }}</span>
                  <span class="site-state-item-name">{{ __('state.categories') }}</span>
                {% if hasCategoriesPage %}</a>{% endif %}
              </div>
            {% endif %}
            {% if site.tags.length > 0 %}
              {% set tagsPageQuery = site.pages.find({type: 'tags'}, {lean: true}) %}
              {% set hasTagsPage = tagsPageQuery.length > 0 %}
              <div class="site-state-item site-state-tags">
                {% if hasTagsPage %}<a href="{{ url_for(tagsPageQuery[0].path) }}">{% endif %}
                  <span class="site-state-item-count">{{ site.tags.length }}</span>
                  <span class="site-state-item-name">{{ __('state.tags') }}</span>
                {% if hasTagsPage %}</a>{% endif %}
              </div>
            {% endif %}

          </nav>

          {% set cc = {'by': 1, 'by-nc': 1, 'by-nc-nd': 1, 'by-nc-sa': 1, 'by-nd': 1, 'by-sa': 1, 'zero': 1} %}
          {% if theme.creative_commons in cc %}
            <div class="cc-license motion-element" itemprop="license">
              <a href="https://creativecommons.org/{% if theme.creative_commons === 'zero' %}publicdomain/zero/1.0{% else %}licenses/{{ theme.creative_commons }}/4.0{% endif %}/deed.zh" class="cc-opacity" target="_blank">
                <img src="{{ url_for(theme.images) }}/cc-{{ theme.creative_commons }}.png" alt="Creative Commons" />
              </a>
            </div>
          {% endif %}#}

          {# Blogroll #}
          {#
          {% if theme.links %}
            <div class="links-of-blogroll motion-element {{ "links-of-blogroll-" + theme.links_layout | default('inline') }}">
              <div class="links-of-blogroll-title">
                <i class="fa  fa-fw fa-{{ theme.links_icon | default('globe') | lower }}"></span>
                {{ theme.links_title }}
              </div>
              <ul class="links-of-blogroll-list">
                {% for name, link in theme.links %}
                  <li class="links-of-blogroll-item">
                    <a href="{{ link }}" title="{{ name }}" target="_blank">{{ name }}</a>
                  </li>
                {% endfor %}
              </ul>
            </div>
          {% endif %}
          #}

          {% include '../_custom/sidebar.swig' %}
        </div>
      </section>

      {% if display_toc and toc(page.content).length > 1 %}
      <!--noindex-->
        <section class="post-toc-wrap motion-element sidebar-panel sidebar-panel-active">
          <div class="post-toc">

            {% if page.toc_number === undefined %}
              {% set toc = toc(page.content, { "class": "nav", list_number: theme.toc.number }) %}
            {% else %}
              {% set toc = toc(page.content, { "class": "nav", list_number: page.toc_number }) %}
            {% endif %}

            {% if toc.length <= 1 %}
              <p class="post-toc-empty">{{ __('post.toc_empty') }}</p>
            {% else %}
              <div class="post-toc-content">{{ toc }}</div>
            {% endif %}

          </div>
        </section>
      <!--/noindex-->
      {% endif %}

      {% if theme.sidebar.b2t %}
        <div class="back-to-top">
          <i class="fa fa-arrow-up"></i>
          {% if theme.sidebar.scrollpercent %}
            <span id="scrollpercent"><span>0</span>%</span>
          {% endif %}
        </div>
      {% endif %}

    </div>
  </aside>
{% endmacro %}
