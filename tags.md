---
layout: page
title: Tags
permalink: /tags/
---
<div class="tags-result">
  <div class="row">
    <div class="c12">
      <!-- Search results placeholder -->
      <p data-search-found>
        <span data-search-found-count></span><span data-search-found-teste></span><span data-search-found-term></span>
      </p>
      <div data-search-results></div>
    </div>
  </div>
  <!-- Search result template -->
  <script type="text/x-template" id="search-result">
  <div class="c3">
    <a href="##Url##">
      <figure>
        <img src="http://img.youtube.com/vi/##video_id##/mqdefault.jpg" data-echo="http://img.youtube.com/vi/##video_id##/mqdefault.jpg">
        <figcaption>##Title##</figcaption>
      </figure>
    </a>
  </div>
  </script>
</div>

<!-- Get the tag name for every tag on the site and set them
to the `site_tags` variable. -->
{% capture site_tags %}{% for tag in site.tags %}{{ tag | first }}{% unless forloop.last %},{% endunless %}{% endfor %}{% endcapture %}

<!-- `tag_words` is a sorted array of the tag names. -->
{% assign tag_words = site_tags | split:',' | sort %}

<!-- List of all tags -->
<ul class="tags">
  {% for item in (0..site.tags.size) %}{% unless forloop.last %}
    {% capture this_word %}{{ tag_words[item] }}{% endcapture %}
    <li>
      <a href="?q={{ this_word | cgi_escape }}" class="tag">{{ this_word }}
        <span>({{ site.tags[this_word].size }})</span>
      </a>
    </li>
  {% endunless %}{% endfor %}
</ul>
<script src="/scripts/search.js"></script>