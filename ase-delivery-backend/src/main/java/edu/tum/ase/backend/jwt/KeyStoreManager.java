package edu.tum.ase.backend.jwt;

import org.springframework.stereotype.Component;
import org.springframework.util.ResourceUtils;

import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.security.Key;
import java.security.KeyStore;
import java.security.KeyStoreException;
import java.security.PublicKey;

@Component
public class KeyStoreManager {

    private KeyStore keyStore;

    private String keyAlias;

    private char[] password = "aseproject".toCharArray();

    public KeyStoreManager() throws KeyStoreException, IOException {
        loadKeyStore();
    }

    public void loadKeyStore() throws KeyStoreException, IOException{

        keyStore = KeyStore.getInstance(KeyStore.getDefaultType());

        FileInputStream fis = null;

        try {

            File keystoreFile = ResourceUtils.getFile("classpath:ase_project.keystore");

            fis = new FileInputStream(keystoreFile);

            keyStore.load(fis, password);

            keyAlias = keyStore.aliases().nextElement();

        } catch (Exception exception) {

            System.err.println("Error when loading KeyStore");
            exception.printStackTrace();

        } finally {

            if (fis != null) {
                fis.close();
            }
        }
    }

    protected PublicKey getPublicKey(){
        try {
            PublicKey publicKey = keyStore.getCertificate(keyAlias).getPublicKey();
            return publicKey;
        } catch (Exception exception) {
            exception.printStackTrace();
            return null;
        }
    }

    protected Key getPrivateKey() {
        try {
            Key privateKey = keyStore.getKey(keyAlias, password);
            return privateKey;
        } catch (Exception ex) {
            ex.printStackTrace();
            return null;
        }
    }
}
