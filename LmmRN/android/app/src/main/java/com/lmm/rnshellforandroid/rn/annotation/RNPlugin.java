package com.lmm.rnshellforandroid.rn.annotation;

import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

/**
 * Created by xmgong on 2017/11/12.
 */
@Retention(RetentionPolicy.RUNTIME)
@Target({ElementType.TYPE})
public @interface RNPlugin {
    /**
     * RN对应方法
     * @return
     */
    String method();

}
