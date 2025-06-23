# Configuration Nginx

```nginx
# Prod
location /easygroup/ {
    proxy_pass http://localhost:4200/;
    ...
}

# Staging
location /easygroup-staging/ {
    auth_basic "Staging Access";
    auth_basic_user_file /etc/nginx/.htpasswd;
    proxy_pass http://localhost:4201/;
    ...
}
```

Alias et fallback Angular pris en charge.

