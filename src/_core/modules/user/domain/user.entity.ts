export type UserProps = {
  id: number;
  name: string;
  email: string;
  password: string;
};

export class UserEntity {
  public readonly id: number;
  public props: Required<Omit<UserProps, 'id'>>;

  constructor(props: Omit<UserProps, 'id'>, id?: number) {
    this.id = id || 0;

    if (props) {
      this.props = props;
      return;
    }

    //@ts-expect-error used for ORM
    this.props = {};
  }

  static create(props: UserProps, id?: number) {
    return new UserEntity(props, id);
  }

  /**
   * Name
   */
  updateName(name: string) {
    this.props.name = name;
  }

  get name() {
    return this.props.name;
  }

  private set name(name: string) {
    console.log(name);
    this.props.name = name;
  }

  /**
   * Email
   */
  updateEmail(email: string) {
    this.props.email = email;
  }

  get email() {
    return this.props.email;
  }

  private set email(email: string) {
    this.props.email = email;
  }

  /**
   * Password
   */
  updatePassword(password: string) {
    this.props.password = password;
  }

  get password() {
    return this.props.password;
  }

  private set password(password: string) {
    this.props.password = password;
  }

  toJSON() {
    const props = { ...this.props };

    delete props.password;

    return {
      id: this.id,
      ...props,
    };
  }
}
