import { UserEntity } from '@core/modules/user/domain/user.entity';

export type AuthProps = {
  id: number;
  accessToken: string;
  refreshToken: string;
  expiresIn: number;
  user: UserEntity;
};

export class AuthEntity {
  public readonly id: number;
  public props: Required<Omit<AuthProps, 'id'>>;

  constructor(props: Omit<AuthProps, 'id'>, id?: number) {
    this.id = id || 0;

    if (props) {
      this.props = props;
      return;
    }

    //@ts-expect-error used for ORM
    this.props = {};
  }

  static create(props: AuthProps, id?: number) {
    return new AuthEntity(props, id);
  }

  /**
   * Access token
   */
  updateAccessToken(accessToken: string) {
    this.props.accessToken = accessToken;
  }

  get accessToken() {
    return this.props.accessToken;
  }

  private set accessToken(accessToken: string) {
    this.props.accessToken = accessToken;
  }

  /**
   * Refresh token
   */
  updateRefreshToken(refreshToken: string) {
    this.props.refreshToken = refreshToken;
  }

  get refreshToken() {
    return this.props.refreshToken;
  }

  private set refreshToken(refreshToken: string) {
    this.props.refreshToken = refreshToken;
  }

  /**
   * Expires in
   */
  updateExpiresIn(expiresIn: number) {
    this.props.expiresIn = expiresIn;
  }

  get expiresIn() {
    return this.props.expiresIn;
  }

  private set expiresIn(expiresIn: number) {
    this.props.expiresIn = expiresIn;
  }

  /**
   * User
   */
  updateUser(user: UserEntity) {
    this.props.user = user;
  }

  get user() {
    return this.props.user;
  }

  private set user(user: UserEntity) {
    this.props.user = user;
  }

  toJSON() {
    return {
      id: this.id,
      ...this.props,
    };
  }
}
