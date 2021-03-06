package com.tridiumap.echarts.ux;

import com.tridium.web.BICollectionSupport;

import javax.baja.naming.BOrd;
import javax.baja.nre.annotations.NiagaraSingleton;
import javax.baja.nre.annotations.NiagaraType;
import javax.baja.sys.BSingleton;
import javax.baja.sys.Context;
import javax.baja.sys.Sys;
import javax.baja.sys.Type;
import javax.baja.web.BIFormFactorMax;
import javax.baja.web.js.BIJavaScript;
import javax.baja.web.js.JsInfo;

/**
 * <p>
 * This widget is intended to be used on a Px page.
 * </p>
 * <ul>
 * </ul>
 */
@NiagaraType
@NiagaraSingleton
public final class BLineWidget extends BSingleton
  implements BIJavaScript, BIFormFactorMax, BICollectionSupport
{
  /*+ ------------ BEGIN BAJA AUTO GENERATED CODE ------------ +*/
  /*@ $com.tridiumap.echarts.ux.BLineWidget(3933907701)1.0$ @*/
  /* Generated Thu Jun 27 13:33:19 CST 2019 by Slot-o-Matic (c) Tridium, Inc. 2012 */
  @SuppressWarnings("unused")
  public static final BLineWidget INSTANCE = new BLineWidget();

////////////////////////////////////////////////////////////////
// Type
////////////////////////////////////////////////////////////////

  @Override
  public Type getType() { return TYPE; }

  public static final Type TYPE = Sys.loadType(BLineWidget.class);

  /*+ ------------ END BAJA AUTO GENERATED CODE -------------- +*/

  @Override
  public JsInfo getJsInfo(Context context) {
    return JS_INFO;
  }

  private static final JsInfo JS_INFO =
    JsInfo.make(BOrd.make("module://echarts/rc/LineWidget.js"), BLineWidgetBuild.TYPE );
}
