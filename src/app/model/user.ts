export class User {
  userId: string;
  username: string;
  password: string;
  profileImageUrl: string;
  lastLoginDate: Date;
  lastLoginDateDisplay: string;
  joinDate: Date;
  roles: string[];
  authorities: string[];
  isActive: boolean;
  isNotLocked: boolean;
  token: string;

  constructor(
    userId: string,
    username: string,
    password: string,
    profileImageUrl: string,
    lastLoginDate: Date,
    lastLoginDateDisplay: string,
    joinDate: Date,
    roles: string[],
    authorities: string[],
    isActive: boolean,
    isNotLocked: boolean,
    token: string
  ) {
    this.userId = userId;
    this.username = username;
    this.password = password;
    this.profileImageUrl = profileImageUrl;
    this.lastLoginDate = lastLoginDate;
    this.lastLoginDateDisplay = lastLoginDateDisplay;
    this.joinDate = joinDate;
    this.roles = roles;
    this.authorities = authorities;
    this.isActive = isActive;
    this.isNotLocked = isNotLocked;
    this.token = token;
  }
}
