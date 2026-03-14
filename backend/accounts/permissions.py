from rest_framework import permissions

class IsAdminUserRole(permissions.BasePermission):
    """
    Allows access only to users with the 'ADMIN' role.
    """
    def has_permission(self, request, view):
        return bool(request.user and request.user.is_authenticated and request.user.role == 'ADMIN')

class IsModeratorUserRole(permissions.BasePermission):
    """
    Allows access only to users with the 'MODERATOR' or 'ADMIN' role.
    """
    def has_permission(self, request, view):
        return bool(request.user and request.user.is_authenticated and request.user.role in ['MODERATOR', 'ADMIN'])
