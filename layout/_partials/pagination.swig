{% if page.prev or page.next %}
  <nav class="pagination">
    {{
      paginator({
        prev_text: '<i class="fas fa-angle-left"></i>',
        next_text: '<i class="fas fa-angle-right"></i>',
        mid_size: 2,
        escape: false,
      })
    }}
  </nav>
{% endif %}
