{# RenderCV 2.8's own markdown/Header.j2.md, with the CV's title one level lower (## rather than #): the home page's <h1> is your name, and the CV sits under it. RenderCV uses this copy because it sits beside cv.yaml #}
{% if cv.name %}
## {{ cv.name }}'s CV
{% endif %}

{% if cv.phone %}
- Phone: {{cv.phone|replace("tel:", "")|replace("-"," ")}}
{% endif %}
{% if cv.email %}
- Email: [{{cv.email}}](mailto:{{cv.email}})
{% endif %}
{% if cv.location %}
- Location: {{cv.location}}
{% endif %}
{% if cv.website %}
- Website: [{{cv.website|replace("https://","")|replace("/","")}}]({{cv.website}})
{% endif %}
{% if cv.social_networks %}
    {% for network in cv.social_networks %}
- {{network.network}}: [{{network.username}}]({{network.url}})
    {% endfor %}
{% endif %}
