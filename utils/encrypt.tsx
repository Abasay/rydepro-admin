// utils/encryption.ts

import forge from 'node-forge';

export const encryptPassword = (
  password: string,
  publicKey: string
): string => {
  const rsa = forge.pki.publicKeyFromPem(
    `-----BEGIN PUBLIC KEY-----
MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAq/XCqKI0wDhrlvMM3BCM
qHoSSlt3KpcEScKKhlMRxgkp/HGay/+EvsyzC4QfPEVBkfGz5Gkcx/ucSsR5d09/
qxGrpMCiFRMcykuTYVgEn6erR75WhECdzJ42Qnt2Gp1XoFFyVIs2xQuCKu/e/m/Q
9I8BP8kivr0cB3ezx7iarBnv7zjYLcSvY6uI2o+q/y1jTF34x5wf+YyLeDb9BIkJ
juIGHBiFZropeWQ/FjqAWWVH5HlIGoCQilTZLTqKUoYO66vknWILUWAfoltUKfrs
ockAhqZYtHwZqGFhX3qeh25FvYJrvB8c94N3WYmgP8vldH/if+YSPPZQpPkkojNk
OwIDAQAB
-----END PUBLIC KEY-----`
  );
  const encrypted = rsa.encrypt(password, 'RSA-OAEP', {
    md: forge.md.sha256.create(),
  });
  return forge.util.encode64(encrypted);
};
