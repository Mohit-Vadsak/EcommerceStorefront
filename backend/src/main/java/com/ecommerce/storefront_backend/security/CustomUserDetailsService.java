package com.ecommerce.storefront_backend.security;

import com.ecommerce.storefront_backend.model.User;
import com.ecommerce.storefront_backend.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.Collection;
import java.util.Set;
import java.util.stream.Collectors;

@Service
public class CustomUserDetailsService implements UserDetailsService {
    
    @Autowired
    private UserService userService;
    
    @Override
    public UserDetails loadUserByUsername(String usernameOrEmail) throws UsernameNotFoundException {
        User user = userService.findByUsernameOrEmail(usernameOrEmail)
                .orElseThrow(() -> new UsernameNotFoundException("User not found: " + usernameOrEmail));
        
        return UserPrincipal.create(user);
    }
    
    // Custom UserPrincipal class
    public static class UserPrincipal implements UserDetails {
        private String id;
        private String username;
        private String email;
        private String password;
        private Collection<? extends GrantedAuthority> authorities;
        private boolean enabled;
        private boolean accountNonExpired;
        private boolean accountNonLocked;
        private boolean credentialsNonExpired;
        
        public UserPrincipal(String id, String username, String email, String password,
                            Collection<? extends GrantedAuthority> authorities, boolean enabled,
                            boolean accountNonExpired, boolean accountNonLocked, boolean credentialsNonExpired) {
            this.id = id;
            this.username = username;
            this.email = email;
            this.password = password;
            this.authorities = authorities;
            this.enabled = enabled;
            this.accountNonExpired = accountNonExpired;
            this.accountNonLocked = accountNonLocked;
            this.credentialsNonExpired = credentialsNonExpired;
        }
        
        public static UserPrincipal create(User user) {
            Collection<GrantedAuthority> authorities = mapRolesToAuthorities(user.getRoles());
            
            return new UserPrincipal(
                user.getId(),
                user.getUsername(),
                user.getEmail(),
                user.getPassword(),
                authorities,
                user.isEnabled(),
                user.isAccountNonExpired(),
                user.isAccountNonLocked(),
                user.isCredentialsNonExpired()
            );
        }
        
        private static Collection<GrantedAuthority> mapRolesToAuthorities(Set<String> roles) {
            return roles.stream()
                    .map(role -> new SimpleGrantedAuthority("ROLE_" + role))
                    .collect(Collectors.toList());
        }
        
        public String getId() {
            return id;
        }
        
        public String getEmail() {
            return email;
        }
        
        @Override
        public String getUsername() {
            return username;
        }
        
        @Override
        public String getPassword() {
            return password;
        }
        
        @Override
        public Collection<? extends GrantedAuthority> getAuthorities() {
            return authorities;
        }
        
        @Override
        public boolean isAccountNonExpired() {
            return accountNonExpired;
        }
        
        @Override
        public boolean isAccountNonLocked() {
            return accountNonLocked;
        }
        
        @Override
        public boolean isCredentialsNonExpired() {
            return credentialsNonExpired;
        }
        
        @Override
        public boolean isEnabled() {
            return enabled;
        }
    }
}
