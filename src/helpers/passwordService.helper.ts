import * as bcrypt from 'bcrypt';

export class PasswordService {
  private async generateSalt(): Promise<string> {
    return await bcrypt.genSalt(10);
  }

  public async hashPassword(password: string): Promise<string> {
    const salt = await this.generateSalt();
    return await bcrypt.hash(password, salt);
  }

  public async comparePassword(
    requestBodyPassword: string,
    userPassword: string,
  ): Promise<boolean> {
    return (await bcrypt.compare(requestBodyPassword, userPassword))
      ? true
      : false;
  }
}
