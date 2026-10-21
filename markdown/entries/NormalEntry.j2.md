{# RenderCV 2.8's own markdown/entries/NormalEntry.j2.md, with each entry's title one level lower (### rather than ##), under its section's <h2>. RenderCV uses this copy because it sits beside cv.yaml #}
### {{ entry.main_column.splitlines()[0] }}

{% for line in entry.date_and_location_column.splitlines() %}
{{ line }}

{% endfor %}
{% for line in entry.main_column.splitlines()[1:] %}
{%- if line != "!!! summary" -%}{{ line|replace("    ", "") }}

{% endif -%}
{% endfor %}
