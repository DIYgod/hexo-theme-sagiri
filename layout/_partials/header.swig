<nav class="site-nav">
  {% set hasSearch = theme.swiftype_key || theme.algolia_search.enable || theme.tinysou_Key || theme.local_search.enable %}

  {% if theme.menu %}
    <ul id="menu" class="menu">
      {% for name, path in theme.menu %}
        {% set itemName = name.toLowerCase() %}
        <li class="menu-item menu-item-{{ itemName | replace(' ', '-') }}">
          <a href="{{ url_for(path.split('||')[0]) | trim }}" rel="section">
            {% if theme.menu_icons.enable %}
              <i class="menu-item-icon fa fa-fw fa-{{ path.split('||')[1] | trim | default('question-circle') }}"></i> <br />
            {% endif %}
            {{ __('menu.' + name) | replace('menu.', '') }}
          </a>
        </li>
      {% endfor %}

      {% if hasSearch %}
        <li class="menu-item menu-item-search">
          {% if theme.swiftype_key %}
            <a href="javascript:;" class="st-search-show-outputs">
          {% elseif theme.local_search.enable || theme.algolia_search.enable %}
            <a href="javascript:;" class="popup-trigger">
          {% endif %}
            {% if theme.menu_icons.enable %}
              <i class="menu-item-icon fa fa-search fa-fw"></i> <br />
            {% endif %}
            {{ __('menu.search') }}
          </a>
        </li>
      {% endif %}
      <li class="menu-item search">
          <form class="search-form">
            <input name="keyword" type="text" class="search-input" placeholder="站内搜索">
            <button type="submit" class="search-submit"><i class="fa fa-search"></i></button>
          </form>
      </li>
      <li class="menu-item online"><span id="online-count">?</span>人在线</li>
    </ul>
  {% endif %}

  {% if hasSearch %}
    <div class="site-search">
      {% include 'search.swig' %}
    </div>
  {% endif %}
</nav>

<div class="site-brand-wrapper" style="background-image: url({{ url_for( theme.header_bg | default(theme.images + '/header.jpg') ) }})">
  <div class="site-meta {% if theme.custom_logo.enabled %}custom-logo{% endif %}">
    {% if theme.custom_logo.image and theme.scheme === 'Muse' %}
      <div class="site-meta-headline">
        <a>
          <img class="custom-logo-image" src="{{ theme.custom_logo.image }}"
               alt="{{ config.title }}"/>
        </a>
      </div>
    {% endif %}

    <div class="custom-logo-site-title">
      <div class="brand">
        <span class="logo-line-before"><i></i></span>
        <div class="site-title">
          <div id="animate" class="animate">
            {% for letter in config.title %}{#
              #}<span>{{ letter }}</span>{#
            #}{% endfor %}
          </div>
          <div id="guide" class="guide">
            {% for letter in config.title %}{#
              #}<span>{{ letter }}</span>{#
            #}{% endfor %}
          </div>
        </div>
        <span class="logo-line-after"><i></i></span>
      </div>
    </div>
      {% if theme.seo %}
        <h1 class="site-subtitle" itemprop="description">{{ config.subtitle }}</h1>
      {% else %}
        <p class="site-subtitle">{{ config.subtitle }}</p>
      {% endif %}
  </div>

  <div class="site-nav-toggle">
    <button>
      <span class="btn-bar"></span>
      <span class="btn-bar"></span>
      <span class="btn-bar"></span>
    </button>
  </div>
</div>
<div class="site-master" itemprop="author" itemscope itemtype="http://schema.org/Person">
    <img class="site-master-avatar" itemprop="image" src="{{ url_for( theme.avatar | default(theme.images + '/avatar.gif') ) }}" alt="{{ theme.author }}" />
    <h2 class="site-master-description" itemprop="description">
        {{ theme.description }}
    </h2>
</div>
{% include '../_custom/header.swig' %}
